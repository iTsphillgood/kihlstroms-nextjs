<?php
namespace Kihlstroms;if(!defined('ABSPATH'))exit;
final class Meta{
 public static function init():void{add_action('init',[self::class,'register'],8);}
 public static function register():void{
  $fields=['price_ex_vat'=>'integer','leasing_monthly'=>'integer','model_year'=>'integer','mileage_km'=>'integer','gross_weight_kg'=>'integer','payload_kg'=>'integer','tow_kg'=>'integer','volume_m3'=>'number','power_hp'=>'integer','range_wltp_km'=>'integer','delivery_text'=>'string','external_listing_url'=>'string','source_url'=>'string','last_verified_at'=>'string','responsible_staff_id'=>'integer','location_id'=>'integer'];
  foreach($fields as $key=>$type){register_post_meta('kihl_vehicle',$key,['type'=>$type,'single'=>true,'show_in_rest'=>true,'sanitize_callback'=>str_contains($key,'url')?'esc_url_raw':($type==='integer'?'absint':($type==='number'?static fn($v)=>(float)$v:'sanitize_text_field')),'auth_callback'=>static fn()=>current_user_can('edit_posts')]);}
 }
}
