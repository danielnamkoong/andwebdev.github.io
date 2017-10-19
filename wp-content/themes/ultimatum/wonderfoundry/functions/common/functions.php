<?php
/*
 WARNING: This file is part of the core Ultimatum framework. DO NOT edit
 this file under any circumstances.
 */

/**
 *
 * This file is a core Ultimatum file and should not be edited.
 *
 * @package  Ultimatum
 * @author   Wonder Foundry http://www.wonderfoundry.com
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     http://ultimatumtheme.com
 * @version 2.38
 */

/* Gather Ultimatum or active Child Theme options we use them very often */
function get_ultimatum_option($type,$key){
	$themesettings = get_option('ultimatum_'.$type);
	if(isset($themesettings[$key])){
		$value = $themesettings[$key];
		return $value;
	} else {
		return false;
	}
}

function get_theme_option($type,$key){
	$themesettings = get_option(THEME_SLUG.'_'.$type);
	if(isset($themesettings[$key])){
		$value = $themesettings[$key];
		return $value;
	} else {
		return false;
	}
}

// Add widgets Sidebars
$sidebars = get_theme_option('sidebars', 'sidebars');
$sidebars = explode(';',$sidebars);
if(is_array($sidebars)){
	$tag = (get_ultimatum_option('tags', 'multi_widget') ? get_ultimatum_option('tags', 'multi_widget') : 'h3');
	if(is_singular()){
		$tag = (get_ultimatum_option('tags', 'single_widget') ? get_ultimatum_option('tags', 'single_widget') :'h3');
	}
	foreach($sidebars as $sidbar){
		register_sidebar( array(
		'name' => __( $sidbar, 'ultimatum' ),
		'id' => 'ultimatum-'.strtolower(str_replace(' ','',$sidbar)),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => "</div>",
		'before_title' => '<'.$tag.' class="widget-title element-title">',
		'after_title' => '</'.$tag.'>',
		) );
	}
}
/**
 * Recursive alternative to str_replace that supports replacing keys as well
 *
 * @param string  $search
 * @param string  $replace
 * @param array   $array
 * @param boolean $keys_too
 *
 * @return array
 */
function replaceTree($search="", $replace="", $array=false, $keys_too=false)
{
	if (!is_array($array)) {
		// Regular replace
		return str_replace($search, $replace, $array);
	}

	$newArr = array();
	foreach ($array as $k=>$v) {
		// Replace keys as well?
		$add_key = $k;
		if ($keys_too) {
			$add_key = str_replace($search, $replace, $k);
		}

		// Recurse
		$newArr[$add_key] = replaceTree($search, $replace, $v, $keys_too);
	}
	return $newArr;
}

class UltimatumAdminBarMenu {

	function __construct()
	{
		if(is_admin())
			return;
		add_action( 'admin_bar_menu', array( $this, "ultimatum_links" ),100 );
	}

	function add_root_menu($name, $id, $href = FALSE)
	{
		global $wp_admin_bar;
		if ( !is_super_admin() || !is_admin_bar_showing() )
			return;

		$wp_admin_bar->add_menu( array(
				'id'   => $id,
				'meta' => array(),
				'title' => $name,
				'href' => $href ) );
	}

	function add_sub_menu($id,$name, $link, $root_menu, $meta = FALSE)
	{
		global $wp_admin_bar;
		if ( ! is_super_admin() || ! is_admin_bar_showing() )
			return;

		$wp_admin_bar->add_menu( array(
				'parent' => $root_menu,
				'title' => $name,
				'href' => $link,
				'meta' => $meta,
				'id' => $id
		) );
	}

	function ultimatum_links() {
		global $ultimatumlayout;
		$this->add_root_menu( "Theme Management", "ultimatumbarmenu" );
		$this->add_sub_menu('edit_layo', "Edit Layout", admin_url().'admin.php?page=wonder-layout&task=edit&theme='.$ultimatumlayout->theme.'&layoutid='.$ultimatumlayout->id, "ultimatumbarmenu" );
		$this->add_sub_menu('edit_layo_css', "Edit Layout CSS",  admin_url().'admin.php?page=wonder-css&layout_id='.$ultimatumlayout->id, "ultimatumbarmenu" );
		$this->add_sub_menu('edit_template_css', "Edit Template CSS",  admin_url().'admin.php?page=wonder-css&template_id='.$ultimatumlayout->theme, "ultimatumbarmenu" );
		$this->add_sub_menu( 'edit_custom_ccs',"Edit Custom CSS", "#", "ultimatumbarmenu",array('onclick'=>'UltCssGenerator()') );
		$this->add_sub_menu( 'edit_ultimatum_options',"Theme Options", admin_url().'admin.php?page='.THEME_SLUG,'ultimatumbarmenu');
	}
}
add_action( "init", "UltimatumAdminBarMenuInit" );
function UltimatumAdminBarMenuInit() {
	global $UltimatumAdminBarMenu;
	if (current_user_can('manage_options')) {
	$UltimatumAdminBarMenu = new UltimatumAdminBarMenu();
	}
}


add_filter('the_content', 'shortcode_empty_paragraph_fix');
function shortcode_empty_paragraph_fix($content)
{
	$array = array (
			'<p>[' => '[',
			']</p>' => ']',
			']<br />' => ']'
	);

	$content = strtr($content, $array);
	return $content;
}

// Register your custom function to override some LayerSlider data
add_action('layerslider_ready', 'my_layerslider_overrides');
function my_layerslider_overrides() {
	// Disable auto-updates
	$GLOBALS['lsAutoUpdateBox'] = false;
}

function ultimatum_generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function ult_custom_numeric_posts_nav($numpages = '', $paged='') {

    if( $numpages <= 1 )
        return;
    $max   = $numpages;
    if ( $paged >= 1 )
        $links[] = $paged;
    if ( $paged >= 3 ) {
        $links[] = $paged - 1;
        $links[] = $paged - 2;
    }
    if ( ( $paged + 2 ) <= $max ) {
        $links[] = $paged + 2;
        $links[] = $paged + 1;
    }
    global $ultimatumlayout;
    if($ultimatumlayout->gridwork!="tbs3"){
        echo '<div class="pagination"><ul>' . "\n";
    } else {
        echo '<div><ul class="pagination">' . "\n";
    }

    if ( get_previous_posts_link() )
        printf( '<li>%s</li>' . "\n", get_previous_posts_link( apply_filters( 'ultimatum_prev_link_text', '&#x000AB;' . __( 'Previous Page', 'ultimatum' ) ) ) );
    if ( ! in_array( 1, $links ) ) {
        $class = 1 == $paged ? ' class="active"' : '';
        printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( 1 ) ), '1' );
        if ( ! in_array( 2, $links ) )
            echo '<li><a>&#x02026;</a></li>';
    }
    sort( $links );
    foreach ( (array) $links as $link ) {
        $class = $paged == $link ? ' class="active"' : '';
        printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $link ) ), $link );
    }
    if ( ! in_array( $max, $links ) ) {
        if ( ! in_array( $max - 1, $links ) )
            echo '<li><a>&#x02026;</a></li>' . "\n";

        $class = $paged == $max ? ' class="active"' : '';
        printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $max ) ), $max );
    }
    if ( get_next_posts_link() )
        printf( '<li>%s</li>' . "\n", get_next_posts_link( apply_filters( 'ultimatum_next_link_text', __( 'Next Page', 'ultimatum' ) . '&#x000BB;' ) ) );

    echo '</ul></div>' . "\n";

}