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

function instRGB (sCube) {
	if (sCube.xCount == undefined) {return};
	if (sCube.yCount == undefined) {sCube.yCount = sCube.xCount};
	if (sCube.zCount == undefined) {sCube.zCount = sCube.xCount};
	if (sCube.xWidth == undefined) {return};
	if (sCube.yWidth == undefined) {sCube.yWidth = sCube.xWidth};
	if (sCube.zWidth == undefined) {sCube.zWidth = sCube.xWidth};
	if (sCube.xSpace == undefined) {return};
	if (sCube.ySpace == undefined) {sCube.ySpace = sCube.xSpace};
	if (sCube.zSpace == undefined) {sCube.zSpace = sCube.xSpace};

	max = Math.max(parseInt(sCube.xWidth) + parseInt(sCube.xSpace), parseInt(sCube.yWidth) + parseInt(sCube.ySpace), parseInt(sCube.zWidth) + parseInt(sCube.zSpace));
	if (parseInt(sCube.xWidth) + parseInt(sCube.xSpace) == max) {max = 'calc(' + sCube.xWidth + ' * ' + sCube.xCount + ' + ' + sCube.xSpace + ' * ' + (sCube.xCount - 1) + ')'};
	if (parseInt(sCube.yWidth) + parseInt(sCube.ySpace) == max) {max = 'calc(' + sCube.yWidth + ' * ' + sCube.yCount + ' + ' + sCube.ySpace + ' * ' + (sCube.yCount - 1) + ')'};
	if (parseInt(sCube.zWidth) + parseInt(sCube.zSpace) == max) {max = 'calc(' + sCube.zWidth + ' * ' + sCube.zCount + ' + ' + sCube.zSpace + ' * ' + (sCube.zCount - 1) + ')'};

	console.log(max);

	$("#rgb").css("width", max);
	$("#rgb").css("height", max);

	for (x = 0; x < sCube.xCount; x++) {
		for (y = 0; y < sCube.yCount; y++) {
			for (z = 0; z < sCube.zCount; z++) {
				objId = "x" + x + "y" + y + "z" + z;
				objClass = "x" + x + " y" + y + " z" + z;
				instCube ("#rgb", objId, sCube.xWidth, sCube.yWidth, sCube.zWidth);
				transform("#" + objId, {xpos:'calc(' + x + '*(' + sCube.xWidth + ' + ' + sCube.xSpace + '))', ypos:'calc(' + y + '*(' + sCube.yWidth + ' + ' + sCube.ySpace + '))', zpos:'calc(' + z + '*(' + sCube.zWidth + ' + ' + sCube.zSpace + '))'});
				$("#" + objId).children().css( "background-color", 'rgba(' + Math.round(255/(sCube.xCount-1)*x) + ', ' + Math.round(255/(sCube.yCount-1)*y) + ', ' + Math.round(255/(sCube.zCount-1)*z) + ', 1)');
			}
		}
	}
}