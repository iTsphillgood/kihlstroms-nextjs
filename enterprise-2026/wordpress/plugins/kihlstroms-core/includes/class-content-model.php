<?php
namespace Kihlstroms;if(!defined('ABSPATH'))exit;
final class Content_Model{
 public static function init():void{add_action('init',[self::class,'register'],5);}
 public static function register():void{
  self::pt('kihl_vehicle','Lagerbilar','Lagerbil','lagerbil');
  self::pt('kihl_model','Modeller','Modell','modell');
  self::pt('kihl_campaign','Kampanjer','Kampanj','kampanj');
  self::pt('kihl_staff','Medarbetare','Medarbetare','medarbetare');
  self::pt('kihl_location','Anläggningar','Anläggning','anlaggningar');
  self::tax('kihl_brand','Märken',['kihl_vehicle','kihl_model','kihl_campaign']);
  self::tax('kihl_body','Karosser',['kihl_vehicle','kihl_model']);
  self::tax('kihl_fuel','Drivlinor',['kihl_vehicle','kihl_model']);
  self::tax('kihl_use','Användningsområden',['kihl_vehicle','kihl_model']);
  self::tax('kihl_weight','Totalvikter',['kihl_vehicle','kihl_model']);
  self::tax('kihl_stock_loc','Lagerorter',['kihl_vehicle']);
 }
 private static function pt($key,$plural,$singular,$slug):void{register_post_type($key,['labels'=>['name'=>$plural,'singular_name'=>$singular],'public'=>true,'show_in_rest'=>true,'has_archive'=>true,'rewrite'=>['slug'=>$slug,'with_front'=>false],'supports'=>['title','editor','thumbnail','excerpt','revisions']]);}
 private static function tax($key,$name,$types):void{register_taxonomy($key,$types,['labels'=>['name'=>$name],'public'=>true,'show_in_rest'=>true,'hierarchical'=>true,'rewrite'=>false]);}
}
