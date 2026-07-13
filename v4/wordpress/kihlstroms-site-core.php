<?php
/**
 * Plugin Name: Kihlströms Site Core
 * Description: Strukturerade fordon, modeller, kampanjer, kundcase, personal och anläggningar för Kihlströms.
 * Version: 0.2.0
 * Author: Kihlströms Transport & Lastbilscenter
 */
if (!defined('ABSPATH')) exit;

final class KLS_Site_Core {
  const VERSION = '0.2.0';
  const VEHICLE = 'kls_vehicle';
  const MODEL = 'kls_model';

  public static function boot() {
    add_action('init', [__CLASS__, 'register_content']);
    add_action('init', [__CLASS__, 'register_meta']);
    add_action('rest_api_init', [__CLASS__, 'register_routes']);
    add_shortcode('kihlstroms_inventory', [__CLASS__, 'inventory_shortcode']);
    add_action('wp_enqueue_scripts', [__CLASS__, 'assets']);
  }

  public static function register_content() {
    $types = [
      self::VEHICLE => ['Fordon','Fordon',true],
      self::MODEL => ['Modeller','Modell',false],
      'kls_campaign' => ['Kampanjer','Kampanj',true],
      'kls_case' => ['Kundcase','Kundcase',true],
      'kls_staff' => ['Personal','Medarbetare',false],
      'kls_location' => ['Anläggningar','Anläggning',false]
    ];
    foreach ($types as $slug=>$settings) register_post_type($slug, [
      'labels'=>['name'=>$settings[0],'singular_name'=>$settings[1]],
      'public'=>true,
      'show_in_rest'=>true,
      'has_archive'=>$settings[2],
      'supports'=>['title','editor','thumbnail','excerpt','revisions','custom-fields'],
      'rewrite'=>['slug'=>str_replace('kls_','',str_replace('_','-',$slug))]
    ]);
    register_taxonomy('kls_brand',[self::VEHICLE,self::MODEL],[
      'label'=>'Märke','public'=>true,'show_in_rest'=>true,'hierarchical'=>true,'rewrite'=>['slug'=>'marke']
    ]);
    register_taxonomy('kls_use',[self::VEHICLE,self::MODEL],[
      'label'=>'Användningsområde','public'=>true,'show_in_rest'=>true,'hierarchical'=>true,'rewrite'=>['slug'=>'anvandningsomrade']
    ]);
  }

  public static function register_meta() {
    $public = [
      'price_ex_vat'=>'integer','campaign_price_ex_vat'=>'integer','payload_kg'=>'integer','tow_weight_kg'=>'integer',
      'total_weight_kg'=>'integer','seats'=>'integer','cargo_volume_m3'=>'number','range_km'=>'integer',
      'powertrain'=>'string','body_type'=>'string','stock_status'=>'string','location_code'=>'string',
      'seller_email'=>'string','source_url'=>'string','campaign_end'=>'string'
    ];
    foreach ($public as $key=>$type) register_post_meta(self::VEHICLE,$key,[
      'single'=>true,'type'=>$type,'show_in_rest'=>true,
      'sanitize_callback'=>self::sanitizer($key,$type),
      'auth_callback'=>fn()=>current_user_can('edit_posts')
    ]);
    foreach (['registration_number','vin'] as $key) register_post_meta(self::VEHICLE,$key,[
      'single'=>true,'type'=>'string','show_in_rest'=>false,
      'sanitize_callback'=>'sanitize_text_field','auth_callback'=>fn()=>current_user_can('edit_posts')
    ]);
  }

  private static function sanitizer($key,$type) {
    if ($key === 'source_url') return 'esc_url_raw';
    if ($key === 'seller_email') return 'sanitize_email';
    if ($type === 'integer') return 'absint';
    if ($type === 'number') return 'floatval';
    return 'sanitize_text_field';
  }

  public static function assets() {
    wp_register_style('kls-inventory',plugins_url('assets/inventory.css',__FILE__),[],self::VERSION);
    wp_register_script('kls-inventory',plugins_url('assets/inventory.js',__FILE__),[],self::VERSION,true);
  }

  public static function inventory_shortcode() {
    wp_enqueue_style('kls-inventory');
    wp_enqueue_script('kls-inventory');
    $q=new WP_Query(['post_type'=>self::VEHICLE,'post_status'=>'publish','posts_per_page'=>-1,'orderby'=>'date','order'=>'DESC']);
    ob_start(); ?>
    <section class="kls-inventory" data-kls-inventory>
      <div class="kls-inventory__filters" role="group" aria-label="Filtrera fordon">
        <button class="is-active" data-filter="all">Alla</button><button data-filter="iveco">IVECO</button><button data-filter="isuzu">Isuzu</button><button data-filter="maxus">Maxus</button>
      </div><div class="kls-inventory__grid">
      <?php while($q->have_posts()){ $q->the_post(); $id=get_the_ID(); $brand=wp_get_post_terms($id,'kls_brand',['fields'=>'slugs']); $brand=$brand[0]??''; $price=(int)get_post_meta($id,'campaign_price_ex_vat',true) ?: (int)get_post_meta($id,'price_ex_vat',true); ?>
        <article class="kls-vehicle" data-brand="<?php echo esc_attr($brand); ?>"><a href="<?php the_permalink(); ?>"><?php if(has_post_thumbnail()) the_post_thumbnail('large',['loading'=>'lazy']); ?><div class="kls-vehicle__body"><h3><?php the_title(); ?></h3><?php if($price): ?><p class="kls-vehicle__price"><?php echo esc_html(number_format_i18n($price)); ?> kr <small>exkl. moms</small></p><?php endif; ?><span>Visa fordon</span></div></a></article>
      <?php } wp_reset_postdata(); ?></div>
    </section><?php return ob_get_clean();
  }

  public static function register_routes() {
    register_rest_route('kihlstroms/v1','/vehicles',[
      'methods'=>'GET','permission_callback'=>'__return_true',
      'args'=>['per_page'=>['sanitize_callback'=>'absint','default'=>24]],
      'callback'=>function(WP_REST_Request $r){
        $q=new WP_Query(['post_type'=>self::VEHICLE,'post_status'=>'publish','posts_per_page'=>min(100,max(1,(int)$r->get_param('per_page')))]);
        $public_keys=['price_ex_vat','campaign_price_ex_vat','payload_kg','tow_weight_kg','total_weight_kg','seats','cargo_volume_m3','range_km','powertrain','body_type','stock_status','location_code','source_url','campaign_end'];
        return rest_ensure_response(array_map(function($p) use($public_keys){
          $meta=[]; foreach($public_keys as $key) $meta[$key]=get_post_meta($p->ID,$key,true);
          return ['id'=>$p->ID,'title'=>get_the_title($p),'url'=>get_permalink($p),'image'=>get_the_post_thumbnail_url($p,'large'),'brands'=>wp_get_post_terms($p->ID,'kls_brand',['fields'=>'slugs']),'meta'=>$meta];
        },$q->posts));
      }
    ]);
  }
}
KLS_Site_Core::boot();
