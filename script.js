function transform (obj, transform={}) {
	if (transform.xpos == undefined) {transform.xpos = 0};
	if (transform.ypos == undefined) {transform.ypos = 0};
	if (transform.zpos == undefined) {transform.zpos = 0};
	if (transform.xrot == undefined) {transform.xrot = 0};
	if (transform.yrot == undefined) {transform.yrot = 0};
	if (transform.zrot == undefined) {transform.zrot = 0};

	$(obj).css("transform", 'translate3d(' + transform.xpos + ', ' + transform.ypos + ', ' + transform.zpos + ') rotateX(' + transform.xrot + ') rotateY(' + transform.yrot + ') rotateZ(' + transform.zrot + ')');
}

function instDiv (parent, objId, width, height, objClass="") {
	$(parent).append('<div id="' + objId + '" class="' + objClass + '" style="width:' + width + '; height:' + height + ';"></div>');
}

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

function instSCube (target, type, mode, sCube) {

	// sCubeFill(mode);

	if (mode == "simple") {
		sCube.xCount = sCube.Count;
		sCube.yCount = sCube.Count;
		sCube.zCount = sCube.Count;
		sCube.xWidth = sCube.Width;
		sCube.yWidth = sCube.Width;
		sCube.zWidth = sCube.Width;
		sCube.xSpace = sCube.Space;
		sCube.ySpace = sCube.Space;
		sCube.zSpace = sCube.Space;
	}

	max = Math.max(parseInt(sCube.xWidth) + parseInt(sCube.xSpace), parseInt(sCube.yWidth) + parseInt(sCube.ySpace), parseInt(sCube.zWidth) + parseInt(sCube.zSpace));
	if (parseInt(sCube.xWidth) + parseInt(sCube.xSpace) == max) {max = 'calc(' + sCube.xWidth + ' * ' + sCube.xCount + ' + ' + sCube.xSpace + ' * ' + (sCube.xCount - 1) + ')'};
	if (parseInt(sCube.yWidth) + parseInt(sCube.ySpace) == max) {max = 'calc(' + sCube.yWidth + ' * ' + sCube.yCount + ' + ' + sCube.ySpace + ' * ' + (sCube.yCount - 1) + ')'};
	if (parseInt(sCube.zWidth) + parseInt(sCube.zSpace) == max) {max = 'calc(' + sCube.zWidth + ' * ' + sCube.zCount + ' + ' + sCube.zSpace + ' * ' + (sCube.zCount - 1) + ')'};

	$(target).val = "";

	$(target).css("width", max);
	$(target).css("height", max);

	for (x = 0; x < sCube.xCount; x++) {
		for (y = 0; y < sCube.yCount; y++) {
			for (z = 0; z < sCube.zCount; z++) {
				objId = "x" + x + "y" + y + "z" + z;
				objClass = "x" + x + " y" + y + " z" + z;
				instCube(target, objId, sCube.xWidth, sCube.yWidth, sCube.zWidth);
				transform("#" + objId, {xpos:'calc(' + x + '*(' + sCube.xWidth + ' + ' + sCube.xSpace + '))', ypos:'calc(' + y + '*(' + sCube.yWidth + ' + ' + sCube.ySpace + '))', zpos:'calc((' + z + ' - (' + sCube.zCount + ' - 1) / 2 ) * (' + sCube.zWidth + ' + ' + sCube.zSpace + '))'});
				if (type == "rgb") {
					var color_r = Math.round(255/(sCube.xCount-1)*x);
					var color_g = Math.round(255/(sCube.yCount-1)*y);
					var color_b = Math.round(255/(sCube.zCount-1)*z);

					$("#" + objId).children().css( "background-color", 'rgba(' + color_r + ', ' + color_g + ', ' + color_b + ', 1)');
				} else if (type == "hsl") {
					var color_h = Math.round(255/(sCube.xCount-1)*x);
					var color_s = Math.round(100/(sCube.yCount-1)*y);
					var color_l = Math.round(100/(sCube.zCount-1)*z);

					$("#" + objId).children().css( 'background-color', 'hsl(' + color_h + ', ' + color_s + '%, ' + color_l + '%)');
				} else if (type == "yuv") {
					var color_y = Math.round(255/(sCube.xCount-1)*x);
					var color_u = Math.round(255/(sCube.yCount-1)*y);
					var color_v = Math.round(255/(sCube.zCount-1)*z);
					
					$("#" + objId).children().css( "background-color", yuv2rgb(color_y, color_u, color_v));
				}
			}
		}
	}
}

function sCubeFill (mode) {

	if (!sCubeVerify(mode)) {
		sCube.Count = 5;
		sCube.Width = "50px";
		sCube.Space = "50px";
	}

	sCube.xCount = sCube.Count;
	sCube.yCount = sCube.Count;
	sCube.zCount = sCube.Count;
	sCube.xWidth = sCube.Width;
	sCube.yWidth = sCube.Width;
	sCube.zWidth = sCube.Width;
	sCube.xSpace = sCube.Space;
	sCube.ySpace = sCube.Space;
	sCube.zSpace = sCube.Space;

}

function sCubeVerify (mode) {
	var bool = true;
	if (mode == "simple") {
		if (sCube.Count == undefined || sCube.Count < 1 || Math.floor(sCube.Count) != sCube.Count) bool = false;
		if (sCube.Width == undefined || parseInt(sCube.Width) == NaN) bool = false;
		if (sCube.Space == undefined || parseInt(sCube.Space) == NaN) bool = false;
	} else if (mode == "advanced") {
		if (sCube.xCount == undefined || sCube.xCount < 1 || Math.floor(sCube.xCount) != sCube.xCount) bool = false;
		if (sCube.xWidth == undefined || parseInt(sCube.xWidth) == NaN) bool = false;
		if (sCube.xSpace == undefined || parseInt(sCube.xSpace) == NaN) bool = false;
		if (sCube.yCount == undefined || sCube.yCount < 1 || Math.floor(sCube.yCount) != sCube.yCount) bool = false;
		if (sCube.yWidth == undefined || parseInt(sCube.yWidth) == NaN) bool = false;
		if (sCube.ySpace == undefined || parseInt(sCube.ySpace) == NaN) bool = false;
		if (sCube.zCount == undefined || sCube.zCount < 1 || Math.floor(sCube.zCount) != sCube.zCount) bool = false;
		if (sCube.zWidth == undefined || parseInt(sCube.zWidth) == NaN) bool = false;
		if (sCube.zSpace == undefined || parseInt(sCube.zSpace) == NaN) bool = false;
	}
	return bool;
}

function yuv2rgb(y,u,v) {
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

	r=r.toString(16);
	g=g.toString(16);
	b=b.toString(16);

	if (r.length<2) r="0"+r;
	if (g.length<2) g="0"+g;
	if (b.length<2) b="0"+b;

	return "#"+r+g+b;
}

function objectSize(the_object) {
	var object_size = 0;
	for (key in the_object){
		if (the_object.hasOwnProperty(key)) {
			object_size++;
		}
	}
	return object_size;
}