/* JSModeler viewer 0.6 - http://www.github.com/kovacsv/JSModeler */ var JSM={mainVersion:0,subVersion:6};JSM.Eps=1e-8;JSM.Inf=9999999999;JSM.RadDeg=57.29577951308232;JSM.DegRad=0.017453292519943;JSM.IsZero=function(a){return Math.abs(a)<JSM.Eps;};JSM.IsPositive=function(a){return a>JSM.Eps;};JSM.IsNegative=function(a){return a<-JSM.Eps;};JSM.IsLower=function(a,b){return b-a>JSM.Eps;};JSM.IsGreater=function(a,b){return a-b>JSM.Eps;};JSM.IsEqual=function(a,b){return Math.abs(b-a)<JSM.Eps;};JSM.IsLowerOrEqual=function(a,b){return JSM.IsLower(a,b)||JSM.IsEqual(a,b);};JSM.IsGreaterOrEqual=function(a,b){return JSM.IsGreater(a,b)||JSM.IsEqual(a,b);};JSM.Minimum=function(a,b){return JSM.IsLower(a,b)?a:b;};JSM.Maximum=function(a,b){return JSM.IsGreater(a,b)?a:b;};JSM.ArcSin=function(value){if(JSM.IsGreaterOrEqual(value,1)){return Math.PI/2;}else{if(JSM.IsLowerOrEqual(value,-1)){return -Math.PI/2;}}return Math.asin(value);};JSM.ArcCos=function(value){if(JSM.IsGreaterOrEqual(value,1)){return 0;}else{if(JSM.IsLowerOrEqual(value,-1)){return Math.PI;}}return Math.acos(value);};JSM.RandomInt=function(from,to){return Math.floor((Math.random()*(to-from+1))+from);};JSM.Coord2D=function(x,y){this.x=x||0;this.y=y||0;};JSM.Coord2D.prototype={Set:function(x,y){this.x=x||0;this.y=y||0;},Clone:function(){return new JSM.Coord2D(this.x,this.y);}};JSM.Coord=function(x,y,z){this.x=x||0;this.y=y||0;this.z=z||0;};JSM.Coord.prototype={Set:function(x,y,z){this.x=x;this.y=y;this.z=z;},Clone:function(){return new JSM.Coord(this.x,this.y,this.z);}};JSM.Vector2D=JSM.Coord2D;JSM.Vector=JSM.Coord;JSM.CoordIsEqual2D=function(a,b){return JSM.IsEqual(a.x,b.x)&&JSM.IsEqual(a.y,b.y);};JSM.CoordDistance2D=function(a,b){var x1=a.x;var y1=a.y;var x2=b.x;var y2=b.y;return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));};JSM.MidCoord2D=function(a,b){return new JSM.Coord2D((a.x+b.x)/2,(a.y+b.y)/2);};JSM.CoordIsEqual=function(a,b){return JSM.IsEqual(a.x,b.x)&&JSM.IsEqual(a.y,b.y)&&JSM.IsEqual(a.z,b.z);};JSM.CoordDistance=function(a,b){var x1=a.x;var y1=a.y;var z1=a.z;var x2=b.x;var y2=b.y;var z2=b.z;return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1));};JSM.CoordSignedDistance=function(a,b,direction){var abDirection=JSM.CoordSub(b,a);var distance=JSM.CoordDistance(a,b);var angle=JSM.GetVectorsAngle(abDirection,direction);if(JSM.IsEqual(angle,Math.PI)){distance=-distance;}return distance;};JSM.MidCoord=function(a,b){return new JSM.Coord((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);};JSM.VectorMultiply=function(vector,scalar){var result=new JSM.Vector();result.x=vector.x*scalar;result.y=vector.y*scalar;result.z=vector.z*scalar;return result;};JSM.VectorDot=function(a,b){return a.x*b.x+a.y*b.y+a.z*b.z;};JSM.VectorCross=function(a,b){var result=new JSM.Vector();result.x=a.y*b.z-a.z*b.y;result.y=a.z*b.x-a.x*b.z;result.z=a.x*b.y-a.y*b.x;return result;};JSM.VectorLength=function(vector){var x=vector.x;var y=vector.y;var z=vector.z;return Math.sqrt(x*x+y*y+z*z);};JSM.VectorNormalize=function(vector){var length=JSM.VectorLength(vector);var result=new JSM.Coord(0,0,0);if(JSM.IsGreater(length,0)){result=JSM.VectorMultiply(vector,1/length);}return result;};JSM.VectorSetLength=function(vector,length){var ratio=length/JSM.VectorLength(vector);var result=JSM.VectorMultiply(vector,ratio);return result;};JSM.GetVectorsAngle=function(a,b){var aDirection=JSM.VectorNormalize(a);var bDirection=JSM.VectorNormalize(b);if(JSM.CoordIsEqual(aDirection,bDirection)){return 0;}var product=JSM.VectorDot(aDirection,bDirection);return JSM.ArcCos(product);};JSM.GetVectorsFullAngle=function(referenceVector,currentVector,normal){var angle=JSM.GetVectorsAngle(referenceVector,currentVector);var origo=new JSM.Coord(0,0,0);if(JSM.CoordTurnType(currentVector,origo,referenceVector,normal)=="Clockwise"){angle=2*Math.PI-angle;}return angle;};JSM.VectorsAreCollinear=function(a,b){var angle=JSM.GetVectorsAngle(a,b);return JSM.IsEqual(angle,0)||JSM.IsEqual(angle,Math.PI);};JSM.CoordAdd=function(a,b){return new JSM.Vector(a.x+b.x,a.y+b.y,a.z+b.z);};JSM.CoordSub=function(a,b){return new JSM.Vector(a.x-b.x,a.y-b.y,a.z-b.z);};JSM.CoordOffset=function(coord,direction,distance){var normal=JSM.VectorNormalize(direction);var result=new JSM.Coord();result.x=coord.x+normal.x*distance;result.y=coord.y+normal.y*distance;result.z=coord.z+normal.z*distance;return result;};JSM.CoordRotate=function(coord,axis,angle,origo){var offseted=JSM.CoordSub(coord,origo);var normal=JSM.VectorNormalize(axis);var u=normal.x;var v=normal.y;var w=normal.z;var x=offseted.x;var y=offseted.y;var z=offseted.z;var result=new JSM.Coord();result.x=-u*(-u*x-v*y-w*z)*(1-Math.cos(angle))+x*Math.cos(angle)+(-w*y+v*z)*Math.sin(angle);result.y=-v*(-u*x-v*y-w*z)*(1-Math.cos(angle))+y*Math.cos(angle)+(w*x-u*z)*Math.sin(angle);result.z=-w*(-u*x-v*y-w*z)*(1-Math.cos(angle))+z*Math.cos(angle)+(-v*x+u*y)*Math.sin(angle);result=JSM.CoordAdd(result,origo);return result;};JSM.ConvertRawDataToThreeMeshes=function(rawData,textureLoadedCallback){var AddMesh=function(mesh){var AddTriangles=function(currentTriangles){var materialIndex=currentTriangles["material"];var parameters=currentTriangles["parameters"];var materialData=materials[materialIndex];var textureName=materialData["texture"];var textureOffset=materialData["offset"];var textureScale=materialData["scale"];var ambientColor=new THREE.Color();var diffuseColor=new THREE.Color();var specularColor=new THREE.Color();ambientColor.setRGB(materialData["ambient"][0],materialData["ambient"][1],materialData["ambient"][2]);diffuseColor.setRGB(materialData["diffuse"][0],materialData["diffuse"][1],materialData["diffuse"][2]);specularColor.setRGB(materialData["specular"][0],materialData["specular"][1],materialData["specular"][2]);if(textureName!==undefined){ambientColor.setRGB(1,1,1);diffuseColor.setRGB(1,1,1);specularColor.setRGB(1,1,1);if(textureOffset===undefined){textureOffset=[0,0];}if(textureScale===undefined){textureScale=[1,1];}}var material=new THREE.MeshLambertMaterial({ambient:ambientColor.getHex(),color:diffuseColor.getHex(),side:THREE.DoubleSide});if(materialData["opacity"]!==1){material.opacity=materialData["opacity"];material.transparent=true;}if(textureName!==undefined){texture=THREE.ImageUtils.loadTexture(textureName,new THREE.UVMapping(),function(image){if(textureLoadedCallback!==undefined){textureLoadedCallback();}});texture.wrapS=THREE.RepeatWrapping;texture.wrapT=THREE.RepeatWrapping;material.map=texture;}var geometry=new THREE.Geometry();var v1,v2,v3,n1,n2,n3,u1,u2,u3;var lastVertex,lastFace,vertexNormals,textureUVs;for(j=0;j<parameters.length;j+=9){v1=3*parameters[j+0];v2=3*parameters[j+1];v3=3*parameters[j+2];n1=3*parameters[j+3];n2=3*parameters[j+4];n3=3*parameters[j+5];u1=2*parameters[j+6];u2=2*parameters[j+7];u3=2*parameters[j+8];lastVertex=geometry.vertices.length;lastFace=geometry.faces.length;geometry.vertices.push(new THREE.Vector3(vertices[v1+0],vertices[v1+1],vertices[v1+2]));geometry.vertices.push(new THREE.Vector3(vertices[v2+0],vertices[v2+1],vertices[v2+2]));geometry.vertices.push(new THREE.Vector3(vertices[v3+0],vertices[v3+1],vertices[v3+2]));geometry.faces.push(new THREE.Face3(lastVertex+0,lastVertex+1,lastVertex+2));vertexNormals=[];vertexNormals.push(new THREE.Vector3(normals[n1+0],normals[n1+1],normals[n1+2]));vertexNormals.push(new THREE.Vector3(normals[n2+0],normals[n2+1],normals[n2+2]));vertexNormals.push(new THREE.Vector3(normals[n3+0],normals[n3+1],normals[n3+2]));geometry.faces[lastFace].vertexNormals=vertexNormals;if(textureName!==undefined){textureUVs=[];textureUVs.push(new THREE.UV(textureOffset[0]+uvs[u1+0]*textureScale[0],textureOffset[1]+uvs[u1+1]*textureScale[1]));textureUVs.push(new THREE.UV(textureOffset[0]+uvs[u2+0]*textureScale[0],textureOffset[1]+uvs[u2+1]*textureScale[1]));textureUVs.push(new THREE.UV(textureOffset[0]+uvs[u3+0]*textureScale[0],textureOffset[1]+uvs[u3+1]*textureScale[1]));geometry.faceVertexUvs[0].push(textureUVs);}}var mesh=new THREE.Mesh(geometry,material);result.push(mesh);};var vertices=mesh["vertices"];if(vertices===undefined){return result;}var normals=mesh["normals"];if(normals===undefined){return result;}var uvs=mesh["uvs"];if(uvs===undefined){return result;}var triangles=mesh["triangles"];var i;for(i=0;i<triangles.length;i++){AddTriangles(triangles[i]);}};var result=[];var materials=rawData["materials"];if(materials===undefined){return result;}var meshes=rawData["meshes"];if(meshes===undefined){return result;}var i;for(i=0;i<meshes.length;i++){AddMesh(meshes[i]);}return result;};JSM.Camera=function(){this.origo=null;this.eye=null;this.center=null;this.up=null;};JSM.Camera.prototype={Init:function(eye,center,up){this.origo=new JSM.Coord(center[0],center[1],center[2]);this.eye=new JSM.Coord(eye[0],eye[1],eye[2]);this.center=new JSM.Coord(center[0],center[1],center[2]);this.up=new JSM.Coord(up[0],up[1],up[2]);},Zoom:function(zoomIn){var direction=JSM.CoordSub(this.center,this.eye);var distance=JSM.VectorLength(direction);if(zoomIn&&distance<0.1){return 0;}var move=distance*0.1;if(!zoomIn){move=move*-1;}this.eye=JSM.CoordOffset(this.eye,direction,move);},Pan:function(distanceX,distanceY){var viewDirection=JSM.VectorNormalize(JSM.CoordSub(this.center,this.eye));var horizontalDirection=JSM.VectorNormalize(JSM.VectorCross(viewDirection,this.up));var verticalDirection=JSM.VectorNormalize(JSM.VectorCross(horizontalDirection,viewDirection));this.eye=JSM.CoordOffset(this.eye,verticalDirection,distanceY);this.eye=JSM.CoordOffset(this.eye,horizontalDirection,distanceX);this.center=JSM.CoordOffset(this.center,verticalDirection,distanceY);this.center=JSM.CoordOffset(this.center,horizontalDirection,distanceX);},Orbit:function(angleX,angleY){var radAngleX=angleX*JSM.DegRad;var radAngleY=angleY*JSM.DegRad;var viewDirection=JSM.VectorNormalize(JSM.CoordSub(this.center,this.eye));var horizontalDirection=JSM.VectorNormalize(JSM.VectorCross(viewDirection,this.up));var verticalDirection=JSM.VectorNormalize(JSM.VectorCross(horizontalDirection,viewDirection));this.eye=JSM.CoordRotate(this.eye,verticalDirection,radAngleX,this.origo);this.center=JSM.CoordRotate(this.center,verticalDirection,radAngleX,this.origo);viewDirection=JSM.VectorNormalize(JSM.CoordSub(this.center,this.eye));horizontalDirection=JSM.VectorNormalize(JSM.VectorCross(viewDirection,verticalDirection));this.eye=JSM.CoordRotate(this.eye,horizontalDirection,radAngleY,this.origo);this.center=JSM.CoordRotate(this.center,horizontalDirection,radAngleY,this.origo);this.up=verticalDirection;},Clone:function(){var result=new JSM.Camera();result.origo=this.origo;result.eye=this.eye;result.center=this.center;result.up=this.up;return result;}};JSM.Mouse=function(){this.down=false;this.button=0;this.shift=false;this.ctrl=false;this.alt=false;this.prevX=0;this.prevY=0;this.currX=0;this.currY=0;this.diffX=0;this.diffY=0;};JSM.Mouse.prototype={Down:function(event,div){var eventParameters=event;if(eventParameters===undefined){eventParameters=window.event;}this.down=true;this.button=event.which;this.shift=event.shiftKey;this.ctrl=event.ctrlKey;this.alt=event.altKey;this.prevX=eventParameters.clientX;this.prevY=eventParameters.clientY;if(div!==undefined){this.prevX=this.prevX-div.offsetLeft;this.prevY=this.prevY-div.offsetTop;}},Move:function(event,div){var eventParameters=event;if(eventParameters===undefined){eventParameters=window.event;}this.shift=event.shiftKey;this.ctrl=event.ctrlKey;this.alt=event.altKey;this.currX=eventParameters.clientX;this.currY=eventParameters.clientY;if(div!==undefined){this.currX=this.currX-div.offsetLeft;this.currY=this.currY-div.offsetTop;}this.diffX=this.currX-this.prevX;this.diffY=this.currY-this.prevY;this.prevX=this.currX;this.prevY=this.currY;},Up:function(event,div){var eventParameters=event;if(eventParameters===undefined){eventParameters=window.event;}this.down=false;this.currX=eventParameters.clientX;this.currY=eventParameters.clientY;if(div!==undefined){this.currX=this.currX-div.offsetLeft;this.currY=this.currY-div.offsetTop;}},Out:function(event,div){var eventParameters=event;if(eventParameters===undefined){eventParameters=window.event;}this.down=false;this.currX=eventParameters.clientX;this.currY=eventParameters.clientY;if(div!==undefined){this.currX=this.currX-div.offsetLeft;this.currY=this.currY-div.offsetTop;}}};JSM.Touch=function(){this.down=false;this.prevX=0;this.prevY=0;this.currX=0;this.currY=0;this.diffX=0;this.diffY=0;};JSM.Touch.prototype={Start:function(event,div){var eventParameters=event;if(eventParameters===undefined){eventParameters=window.event;}if(event.touches.length==0){return;}var touch=event.touches[0];this.down=true;this.prevX=touch.pageX-div.offsetLeft;this.prevY=touch.pageY-div.offsetTop;},Move:function(event,div){var eventParameters=event;if(eventParameters===undefined){eventParameters=window.event;}if(event.touches.length==0){return;}var touch=event.touches[0];this.currX=touch.pageX-div.offsetLeft;this.currY=touch.pageY-div.offsetTop;this.diffX=this.currX-this.prevX;this.diffY=this.currY-this.prevY;this.prevX=this.currX;this.prevY=this.currY;},End:function(event,div){var eventParameters=event;if(eventParameters===undefined){eventParameters=window.event;}this.down=false;}};JSM.Viewer=function(){this.canvas=null;this.scene=null;this.camera=null;this.renderer=null;this.ambientLight=null;this.directionalLight=null;this.cameraMove=null;this.mouse=null;this.touch=null;this.settings=null;};JSM.Viewer.prototype={Start:function(canvasName,settings){if(!this.IsWebGLEnabled()){return false;}if(!this.InitSettings(settings)){return false;}if(!this.InitThree(canvasName)){return false;}if(!this.InitCamera()){return false;}if(!this.InitLights()){return false;}if(!this.InitEvents()){return false;}this.Draw();return true;},IsWebGLEnabled:function(){if(!window.WebGLRenderingContext){return false;}if(!document.createElement("canvas").getContext("experimental-webgl")){return false;}return true;},InitSettings:function(settings){this.settings={"cameraEyePosition":[1,1,1],"cameraCenterPosition":[0,0,0],"cameraUpVector":[0,0,1],"fieldOfView":45,"nearClippingPlane":0.1,"farClippingPlane":1000,"lightAmbientColor":[0.5,0.5,0.5],"lightDiffuseColor":[1,1,1]};if(settings!=undefined){if(settings["cameraEyePosition"]!==undefined){this.settings["cameraEyePosition"]=settings["cameraEyePosition"];}if(settings["cameraCenterPosition"]!==undefined){this.settings["cameraCenterPosition"]=settings["cameraCenterPosition"];}if(settings["cameraUpVector"]!==undefined){this.settings["cameraUpVector"]=settings["cameraUpVector"];}if(settings["fieldOfView"]!==undefined){this.settings["fieldOfView"]=settings["fieldOfView"];}if(settings["nearClippingPlane"]!==undefined){this.settings["nearClippingPlane"]=settings["nearClippingPlane"];}if(settings["farClippingPlane"]!==undefined){this.settings["farClippingPlane"]=settings["farClippingPlane"];}if(settings["lightAmbientColor"]!==undefined){this.settings["lightAmbientColor"]=settings["lightAmbientColor"];}if(settings["lightDiffuseColor"]!==undefined){this.settings["lightDiffuseColor"]=settings["lightDiffuseColor"];}}return true;},InitThree:function(canvasName){this.canvas=document.getElementById(canvasName);if(!this.canvas){return false;}this.scene=new THREE.Scene();if(!this.scene){return false;}var parameters={canvas:this.canvas,antialias:true};this.renderer=new THREE.WebGLRenderer(parameters);if(!this.renderer){return false;}this.renderer.setSize(this.canvas.width,this.canvas.height);return true;},InitCamera:function(canvasName){this.mouse=new JSM.Mouse();if(!this.mouse){return false;}this.touch=new JSM.Touch();if(!this.touch){return false;}this.cameraMove=new JSM.Camera();if(!this.cameraMove){return false;}this.cameraMove.Init(this.settings["cameraEyePosition"],this.settings["cameraCenterPosition"],this.settings["cameraUpVector"]);this.camera=new THREE.PerspectiveCamera(this.settings["fieldOfView"],this.canvas.width/this.canvas.height,this.settings["nearClippingPlane"],this.settings["farClippingPlane"]);if(!this.camera){return false;}this.scene.add(this.camera);return true;},InitLights:function(){var ambientColor=new THREE.Color();var diffuseColor=new THREE.Color();ambientColor.setRGB(this.settings["lightAmbientColor"][0],this.settings["lightAmbientColor"][1],this.settings["lightAmbientColor"][2]);diffuseColor.setRGB(this.settings["lightDiffuseColor"][0],this.settings["lightDiffuseColor"][1],this.settings["lightDiffuseColor"][2]);this.ambientLight=new THREE.AmbientLight(ambientColor.getHex());if(!this.ambientLight){return false;}this.scene.add(this.ambientLight);this.directionalLight=new THREE.DirectionalLight(diffuseColor.getHex());if(!this.directionalLight){return false;}this.directionalLight.position.set(0,0,1).normalize();this.scene.add(this.directionalLight);return true;},InitEvents:function(){var myThis=this;if(document.addEventListener){document.addEventListener("mousemove",function(event){myThis.OnMouseMove(event);});document.addEventListener("mouseup",function(event){myThis.OnMouseUp(event);});}if(this.canvas.addEventListener){this.canvas.addEventListener("mousedown",function(event){myThis.OnMouseDown(event);},false);this.canvas.addEventListener("DOMMouseScroll",function(event){myThis.OnMouseWheel(event);},false);this.canvas.addEventListener("mousewheel",function(event){myThis.OnMouseWheel(event);},false);this.canvas.addEventListener("touchstart",function(event){myThis.OnTouchStart(event);},false);this.canvas.addEventListener("touchmove",function(event){myThis.OnTouchMove(event);},false);this.canvas.addEventListener("touchend",function(event){myThis.OnTouchEnd(event);},false);}return true;},AddMesh:function(mesh){this.scene.add(mesh);this.Draw();},GetMesh:function(index){var currentIndex=0;var i,current;for(i=0;i<this.scene.__objects.length;i++){current=this.scene.__objects[i];if(current instanceof THREE.Mesh){if(currentIndex==index){return current;}currentIndex++;}}alert("not found");return new THREE.Mesh();},RemoveMeshes:function(){for(var i=0;i<this.scene.__objects.length;i++){var current=this.scene.__objects[i];if(current instanceof THREE.Mesh){this.scene.remove(current);i--;}}},Resize:function(){this.camera.aspect=this.canvas.width/this.canvas.height;this.camera.updateProjectionMatrix();this.renderer.setSize(this.canvas.width,this.canvas.height);this.Draw();},FitInWindow:function(){var center=this.GetCenter();var radius=this.GetBoundingSphereRadius();this.FitInWindowWithCenterAndRadius(center,radius);},FitInWindowWithCenterAndRadius:function(center,radius){var offsetToOrigo=JSM.CoordSub(this.cameraMove.center,center);this.cameraMove.origo=center;this.cameraMove.center=center;this.cameraMove.eye=JSM.CoordSub(this.cameraMove.eye,offsetToOrigo);var centerEyeDirection=JSM.VectorNormalize(JSM.CoordSub(this.cameraMove.eye,this.cameraMove.center));var fieldOfView=this.settings["fieldOfView"]/2;if(this.canvas.width<this.canvas.height){fieldOfView=fieldOfView*this.canvas.width/this.canvas.height;}var distance=radius/Math.sin(fieldOfView*JSM.DegRad);this.cameraMove.eye=JSM.CoordOffset(this.cameraMove.center,centerEyeDirection,distance);this.Draw();},GetCenter:function(){var boundingBox=this.GetBoundingBox();var center=JSM.MidCoord(boundingBox[0],boundingBox[1]);return center;},GetBoundingBox:function(){var min=new JSM.Coord(JSM.Inf,JSM.Inf,JSM.Inf);var max=new JSM.Coord(-JSM.Inf,-JSM.Inf,-JSM.Inf);var i,j,current,geometry,coord;for(i=0;i<this.scene.__objects.length;i++){current=this.scene.__objects[i];if(current instanceof THREE.Mesh){geometry=current.geometry;for(j=0;j<geometry.vertices.length;j++){coord=geometry.vertices[j];min.x=JSM.Minimum(min.x,coord.x);min.y=JSM.Minimum(min.y,coord.y);min.z=JSM.Minimum(min.z,coord.z);max.x=JSM.Maximum(max.x,coord.x);max.y=JSM.Maximum(max.y,coord.y);max.z=JSM.Maximum(max.z,coord.z);}}}return[min,max];},GetBoundingSphereRadius:function(){var center=this.GetCenter();var radius=0;var i,j,current;for(i=0;i<this.scene.__objects.length;i++){current=this.scene.__objects[i];if(current instanceof THREE.Mesh){geometry=current.geometry;for(j=0;j<geometry.vertices.length;j++){current=JSM.CoordDistance(center,geometry.vertices[j]);if(JSM.IsGreater(current,radius)){radius=current;}}}}return radius;},GetObjectsUnderMouse:function(){var projector=new THREE.Projector();var mouseX=(this.mouse.currX/this.canvas.width)*2-1;var mouseY=-(this.mouse.currY/this.canvas.height)*2+1;var cameraPosition=this.camera.position;var vector=new THREE.Vector3(mouseX,mouseY,0.5);projector.unprojectVector(vector,this.camera);var ray=new THREE.Ray(cameraPosition,vector.subSelf(cameraPosition).normalize());return ray.intersectObjects(this.scene.children);},GetFaceUnderMouse:function(){var intersects=this.GetObjectsUnderMouse();var face=null;if(intersects.length>0){face=intersects[0].face;}return face;},GetFaceIndexUnderMouse:function(){var intersects=this.GetObjectsUnderMouse();var faceIndex=-1;if(intersects.length>0){faceIndex=intersects[0].faceIndex;}return faceIndex;},Draw:function(){this.camera.position=this.cameraMove.eye;this.camera.up=this.cameraMove.up;this.camera.lookAt(this.cameraMove.center);this.directionalLight.position=new THREE.Vector3().sub(this.cameraMove.eye,this.cameraMove.center);this.renderer.render(this.scene,this.camera);return true;},OnMouseDown:function(event){this.mouse.Down(event,this.canvas);},OnMouseMove:function(event){this.mouse.Move(event,this.canvas);if(!this.mouse.down){return;}var ratio=1;if(this.mouse.shift){ratio=0.01;this.cameraMove.Pan(-this.mouse.diffX*ratio,this.mouse.diffY*ratio);}else{ratio=-0.5;this.cameraMove.Orbit(this.mouse.diffX*ratio,this.mouse.diffY*ratio);}this.Draw();},OnMouseUp:function(event){this.mouse.Up(event,this.canvas);},OnMouseOut:function(event){this.mouse.Out(event,this.canvas);},OnMouseWheel:function(event){var eventParameters=event;if(eventParameters===null){eventParameters=window.event;}var delta=0;if(eventParameters.detail){delta=-eventParameters.detail;}else{if(eventParameters.wheelDelta){delta=eventParameters.wheelDelta/40;}}var zoomIn=delta>0;this.cameraMove.Zoom(zoomIn);this.Draw();},OnTouchStart:function(event){this.touch.Start(event,this.canvas);},OnTouchMove:function(event){this.touch.Move(event,this.canvas);if(!this.touch.down){return;}var ratio=-0.5;this.cameraMove.Orbit(this.touch.diffX*ratio,this.touch.diffY*ratio);this.Draw();},OnTouchEnd:function(event){this.touch.End(event,this.canvas);}};