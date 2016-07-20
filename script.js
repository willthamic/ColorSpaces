// Transforms an element with x, y and z position and rotation.
// I: obj - A jquery selector for the element; transform - an object with xpos, ypos, zpos, xrot, yrot and zrot attributes with appropriate unit suffix.
function transform (obj, transform={}) {
	if (transform.xpos == undefined) {transform.xpos = 0};
	if (transform.ypos == undefined) {transform.ypos = 0};
	if (transform.zpos == undefined) {transform.zpos = 0};
	if (transform.xrot == undefined) {transform.xrot = 0};
	if (transform.yrot == undefined) {transform.yrot = 0};
	if (transform.zrot == undefined) {transform.zrot = 0};

	$(obj).css("transform", 'translate3d(' + transform.xpos + ', ' + transform.ypos + ', ' + transform.zpos + ') rotateX(' + transform.xrot + ') rotateY(' + transform.yrot + ') rotateZ(' + transform.zrot + ')');
}

// Creates a div with certain parameters.
// I: parent - A jquery selector for the divs parent; objId - The id of the div; width - width of the div; height - height of the div; objClass - class for the div (optional).
function instDiv (parent, objId, width, height, objClass="") {
	$(parent).append('<div id="' + objId + '" class="' + objClass + '" style="width:' + width + '; height:' + height + ';"></div>');
}

// Creates a cube with certain parameters.
// I: parent - A jquery selector for the parent of the cube; id - id of the cube, also affects cube faces ids; xlen - length of cube on x axis; ylen/zlen - length of cube on y/z axis (optional).
function instCube (parent, id, xlen, ylen=xlen, zlen=xlen) {
	max = Math.max(parseInt(xlen), parseInt(ylen), parseInt(zlen));

	if (parseInt(xlen) == max) {max = xlen};
	if (parseInt(ylen) == max) {max = ylen};
	if (parseInt(zlen) == max) {max = zlen};
	
	$(parent).append('<div id="' + id + '" class="cube" style="width:' + max + '; height:' + max + ';"></div>');

	instDiv('#' + id, id + '_l', zlen, ylen, 'face'); // Create face left 
	instDiv('#' + id, id + '_r', zlen, ylen, 'face'); // Create face right
	instDiv('#' + id, id + '_u', xlen, zlen, 'face'); // Create face up   
	instDiv('#' + id, id + '_d', xlen, zlen, 'face'); // Create face down 
	instDiv('#' + id, id + '_b', xlen, ylen, 'face'); // Create face back 
	instDiv('#' + id, id + '_f', xlen, ylen, 'face'); // Create face front
 
	transform('#' + id + '_l', {xpos:'calc(' + xlen + ' / -2)', ypos:'calc((' + zlen + ' - ' + ylen + ') / 2)', yrot:'-90deg'})
	transform('#' + id + '_r', {xpos:'calc(' + xlen + ' /  2)', ypos:'calc((' + zlen + ' - ' + ylen + ') / 2)', yrot: '90deg' })
	transform('#' + id + '_u', {ypos:'calc(' + ylen + ' /  2)', xpos:'calc((' + zlen + ' - ' + xlen + ') / 2)', xrot: '90deg' })
	transform('#' + id + '_d', {ypos:'calc(' + ylen + ' / -2)', xpos:'calc((' + zlen + ' - ' + xlen + ') / 2)', xrot:'-90deg'})
	transform('#' + id + '_b', {zpos:'calc(' + zlen + ' / -2)', xpos:'calc((' + zlen + ' - ' + xlen + ') / 2)', ypos:'calc((' + zlen + ' - ' + ylen + ') / 2)', yrot:'180deg'})
	transform('#' + id + '_f', {zpos:'calc(' + zlen + ' /  2)', xpos:'calc((' + zlen + ' - ' + xlen + ') / 2)', ypos:'calc((' + zlen + ' - ' + ylen + ') / 2)'})
}

// Creates a cube cluster with certain parametrs.
// I: target - the div that will be filled with the cluster; type - color format of the cube; sCube - object with the sCube parameters.
function instSCube (target, type, sCube) {
	
	console.log(type);

	if (objectSize(sCube) == 3) {
		sCube.xCount = sCube.yCount = sCube.zCount = sCube.Count;
		sCube.xWidth = sCube.yWidth = sCube.zWidth = sCube.Width;
		sCube.xSpace = sCube.ySpace = sCube.zSpace = sCube.Space;
	}

	$(target).empty();

	$(target).css("width", 'calc(' + sCube.xWidth + ' * ' + sCube.xCount + ' + ' + sCube.xSpace + ' * ' + (sCube.xCount - 1) + ')');
	$(target).css("height", 'calc(' + sCube.yWidth + ' * ' + sCube.yCount + ' + ' + sCube.ySpace + ' * ' + (sCube.yCount - 1) + ')');

	for (x = 0; x < sCube.xCount; x++) {
		for (y = 0; y < sCube.yCount; y++) {
			for (z = 0; z < sCube.zCount; z++) {
				objId = "x" + x + "y" + y + "z" + z;
				objClass = "x" + x + " y" + y + " z" + z;
				instCube(target, objId, sCube.xWidth, sCube.yWidth, sCube.zWidth);
				transform("#" + objId, 
					{
						xpos:'calc(' + x + '*(' + sCube.xWidth + ' + ' + sCube.xSpace + '))', 
						ypos:'calc(' + y + '*(' + sCube.yWidth + ' + ' + sCube.ySpace + '))', 
						zpos:'calc((' + z + ' - (' + sCube.zCount + ' - 1) / 2 ) * (' + sCube.zWidth + ' + ' + sCube.zSpace + '))'
					});
				$("#" + objId).addClass(objClass);
				var color = [Math.round(255/(sCube.xCount-1)*x), Math.round(255/(sCube.yCount-1)*y), Math.round(255/(sCube.zCount-1)*z)];
				if (type == "rgb") {
					$("#" + objId).children().css( "background-color", rgb2hex(color[0], color[1], color[2]));
				} else if (type == "hsl") {
					$("#" + objId).children().css( "background-color", hsl2hex(color[0], color[1], color[2]));
				} else if (type == "yuv") {
					$("#" + objId).children().css( "background-color", yuv2hex(color[0], color[1], color[2]));
				}
			}
		}
	}
}

// Converts YUV color to a hex color code.
// I: y - brightness; u/v - chroma.
function yuv2hex(y,u,v) {
	var r,g,b;

	r = Math.floor(y + 1.4075 * (v - 128));
	g = Math.floor(y - 0.3455 * (u - 128) - (0.7169 * (v - 128)));
	b = Math.floor(y + 1.7790 * (u - 128));

	if (r<0) r=0;
	else if (r>255) r=255;

	if (g<0) g=0;
	else if (g>255) g=255;

	if (b<0) b=0;
	else if (b>255) b=255;

	return rgb2hex(r,g,b);
}

// Converts RGB color to a hex color code.
// I: r - red component; g - green component; b - blue component.
function rgb2hex (r,g,b) {
	
	r=Math.round(r).toString(16);
	g=Math.round(g).toString(16);
	b=Math.round(b).toString(16);

	if (r.length<2) r="0"+r;
	if (g.length<2) g="0"+g;
	if (b.length<2) b="0"+b;

	return "#"+r+g+b;
}

// Converts HSL color to a hex color code.
// I: h - hue component; s - saturation component; l - lightness component.
function hsl2hex(h, s, l) {
	var m1, m2, hue;
	var r, g, b
	s /= 255;
	l /= 255;
	if (s == 0)
		r = g = b = (l * 255);
	else {
		if (l <= 0.5)
			m2 = l * (s + 1);
		else
			m2 = l + s - l * s;
		m1 = l * 2 - m2;
		hue = h / 255;
		r = HueToRgb(m1, m2, hue + 1/3);
		g = HueToRgb(m1, m2, hue);
		b = HueToRgb(m1, m2, hue - 1/3);
	}
	return rgb2hex(r,g,b);
}

function HueToRgb(m1, m2, hue) {
	var v;
	if (hue < 0)
		hue += 1;
	else if (hue > 1)
		hue -= 1;

	if (6 * hue < 1)
		v = m1 + (m2 - m1) * hue * 6;
	else if (2 * hue < 1)
		v = m2;
	else if (3 * hue < 2)
		v = m1 + (m2 - m1) * (2/3 - hue) * 6;
	else
		v = m1;

	return 255 * v;
}

// Returns the amount of attributes in an object.
function objectSize(the_object) {
	var object_size = 0;
	for (key in the_object){
		if (the_object.hasOwnProperty(key)) {
			object_size++;
		}
	}
	return object_size;
}