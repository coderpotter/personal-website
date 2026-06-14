import{I as re,F as G,a as R,b as B,W as ae,B as H,S as K,V as y,c as le,U as V,e as k,f as Q,M as ce,g as C,L as de,h as fe,i as ue,k as pe,l as he,_ as q,j as a,C as me,d as ve,w as xe,u as ge,m as ye}from"./index.S1Mu3CT5.js";import{r as x}from"./index.DnAXTA8P.js";import{v as ee,E as Se}from"./Environment.DKa-XpYx.js";const te=ee>=125?"uv1":"uv2",X=new H,j=new y;class F extends re{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],s=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(s),this.setAttribute("position",new G(e,3)),this.setAttribute("uv",new G(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,s=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),s.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const s=new R(t,6,1);return this.setAttribute("instanceStart",new B(s,3,0)),this.setAttribute("instanceEnd",new B(s,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let s;e instanceof Float32Array?s=e:Array.isArray(e)&&(s=new Float32Array(e));const n=new R(s,t*2,1);return this.setAttribute("instanceColorStart",new B(n,t,0)),this.setAttribute("instanceColorEnd",new B(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ae(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new H);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),X.setFromBufferAttribute(t),this.boundingBox.union(X))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new K),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const s=this.boundingSphere.center;this.boundingBox.getCenter(s);let n=0;for(let i=0,l=e.count;i<l;i++)j.fromBufferAttribute(e,i),n=Math.max(n,s.distanceToSquared(j)),j.fromBufferAttribute(t,i),n=Math.max(n,s.distanceToSquared(j));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class ne extends F{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,s=new Float32Array(2*t);for(let n=0;n<t;n+=3)s[2*n]=e[n],s[2*n+1]=e[n+1],s[2*n+2]=e[n+2],s[2*n+3]=e[n+3],s[2*n+4]=e[n+4],s[2*n+5]=e[n+5];return super.setPositions(s),this}setColors(e,t=3){const s=e.length-t,n=new Float32Array(2*s);if(t===3)for(let i=0;i<s;i+=t)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];else for(let i=0;i<s;i+=t)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5],n[2*i+6]=e[i+6],n[2*i+7]=e[i+7];return super.setColors(n,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class W extends le{constructor(e){super({type:"LineMaterial",uniforms:V.clone(V.merge([k.common,k.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Q(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${ee>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const T=new C,$=new y,Y=new y,p=new C,h=new C,w=new C,N=new y,I=new fe,m=new de,J=new y,O=new H,D=new K,b=new C;let _,A;function Z(r,e,t){return b.set(0,0,-e,1).applyMatrix4(r.projectionMatrix),b.multiplyScalar(1/b.w),b.x=A/t.width,b.y=A/t.height,b.applyMatrix4(r.projectionMatrixInverse),b.multiplyScalar(1/b.w),Math.abs(Math.max(b.x,b.y))}function we(r,e){const t=r.matrixWorld,s=r.geometry,n=s.attributes.instanceStart,i=s.attributes.instanceEnd,l=Math.min(s.instanceCount,n.count);for(let o=0,c=l;o<c;o++){m.start.fromBufferAttribute(n,o),m.end.fromBufferAttribute(i,o),m.applyMatrix4(t);const f=new y,u=new y;_.distanceSqToSegment(m.start,m.end,u,f),u.distanceTo(f)<A*.5&&e.push({point:u,pointOnLine:f,distance:_.origin.distanceTo(u),object:r,face:null,faceIndex:o,uv:null,[te]:null})}}function be(r,e,t){const s=e.projectionMatrix,i=r.material.resolution,l=r.matrixWorld,o=r.geometry,c=o.attributes.instanceStart,f=o.attributes.instanceEnd,u=Math.min(o.instanceCount,c.count),v=-e.near;_.at(1,w),w.w=1,w.applyMatrix4(e.matrixWorldInverse),w.applyMatrix4(s),w.multiplyScalar(1/w.w),w.x*=i.x/2,w.y*=i.y/2,w.z=0,N.copy(w),I.multiplyMatrices(e.matrixWorldInverse,l);for(let S=0,z=u;S<z;S++){if(p.fromBufferAttribute(c,S),h.fromBufferAttribute(f,S),p.w=1,h.w=1,p.applyMatrix4(I),h.applyMatrix4(I),p.z>v&&h.z>v)continue;if(p.z>v){const d=p.z-h.z,g=(p.z-v)/d;p.lerp(h,g)}else if(h.z>v){const d=h.z-p.z,g=(h.z-v)/d;h.lerp(p,g)}p.applyMatrix4(s),h.applyMatrix4(s),p.multiplyScalar(1/p.w),h.multiplyScalar(1/h.w),p.x*=i.x/2,p.y*=i.y/2,h.x*=i.x/2,h.y*=i.y/2,m.start.copy(p),m.start.z=0,m.end.copy(h),m.end.z=0;const M=m.closestPointToPointParameter(N,!0);m.at(M,J);const U=ue.lerp(p.z,h.z,M),L=U>=-1&&U<=1,P=N.distanceTo(J)<A*.5;if(L&&P){m.start.fromBufferAttribute(c,S),m.end.fromBufferAttribute(f,S),m.start.applyMatrix4(l),m.end.applyMatrix4(l);const d=new y,g=new y;_.distanceSqToSegment(m.start,m.end,g,d),t.push({point:g,pointOnLine:d,distance:_.origin.distanceTo(g),object:r,face:null,faceIndex:S,uv:null,[te]:null})}}}class ie extends ce{constructor(e=new F,t=new W({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,s=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let l=0,o=0,c=t.count;l<c;l++,o+=2)$.fromBufferAttribute(t,l),Y.fromBufferAttribute(s,l),n[o]=o===0?0:n[o-1],n[o+1]=n[o]+$.distanceTo(Y);const i=new R(n,2,1);return e.setAttribute("instanceDistanceStart",new B(i,1,0)),e.setAttribute("instanceDistanceEnd",new B(i,1,1)),this}raycast(e,t){const s=this.material.worldUnits,n=e.camera;n===null&&!s&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const i=e.params.Line2!==void 0&&e.params.Line2.threshold||0;_=e.ray;const l=this.matrixWorld,o=this.geometry,c=this.material;A=c.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),D.copy(o.boundingSphere).applyMatrix4(l);let f;if(s)f=A*.5;else{const v=Math.max(n.near,D.distanceToPoint(_.origin));f=Z(n,v,c.resolution)}if(D.radius+=f,_.intersectsSphere(D)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),O.copy(o.boundingBox).applyMatrix4(l);let u;if(s)u=A*.5;else{const v=Math.max(n.near,O.distanceToPoint(_.origin));u=Z(n,v,c.resolution)}O.expandByScalar(u),_.intersectsBox(O)!==!1&&(s?we(this,t):be(this,n,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(T),this.material.uniforms.resolution.value.set(T.z,T.w))}}class _e extends ie{constructor(e=new ne,t=new W({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Ee=x.forwardRef(function({points:e,color:t=16777215,vertexColors:s,linewidth:n,lineWidth:i,segments:l,dashed:o,...c},f){var u,v;const S=pe(L=>L.size),z=x.useMemo(()=>l?new ie:new _e,[l]),[E]=x.useState(()=>new W),M=(s==null||(u=s[0])==null?void 0:u.length)===4?4:3,U=x.useMemo(()=>{const L=l?new F:new ne,P=e.map(d=>{const g=Array.isArray(d);return d instanceof y||d instanceof C?[d.x,d.y,d.z]:d instanceof Q?[d.x,d.y,0]:g&&d.length===3?[d[0],d[1],d[2]]:g&&d.length===2?[d[0],d[1],0]:d});if(L.setPositions(P.flat()),s){t=16777215;const d=s.map(g=>g instanceof he?g.toArray():g);L.setColors(d.flat(),M)}return L},[e,l,s,M]);return x.useLayoutEffect(()=>{z.computeLineDistances()},[e,z]),x.useLayoutEffect(()=>{o?E.defines.USE_DASH="":delete E.defines.USE_DASH,E.needsUpdate=!0},[o,E]),x.useEffect(()=>()=>{U.dispose(),E.dispose()},[U]),x.createElement("primitive",q({object:z,ref:f},c),x.createElement("primitive",{object:U,attach:"geometry"}),x.createElement("primitive",q({object:E,attach:"material",color:t,vertexColors:!!s,resolution:[S.width,S.height],linewidth:(v=n??i)!==null&&v!==void 0?v:1,dashed:o,transparent:M===4},c)))});function se(r,e,t,s){if(r===0)return{pos:new y(e,t,s),children:[]};const n=Math.floor(Math.random()*3)+1,i=[];for(let l=0;l<n;l++){const o=e+1.5+Math.random()*.5,c=t+(Math.random()-.5)*4,f=s+(Math.random()-.5)*4;i.push(se(r-1,o,c,f))}return{pos:new y(e,t,s),children:i}}function oe(r,e=[],t=[]){return e.push(r.pos),r.children.forEach(s=>{t.push([r.pos,s.pos]),oe(s,e,t)}),{nodes:e,edges:t}}function Le({constraintX:r}){const{nodes:e,edges:t}=x.useMemo(()=>{const i=se(5,-6,0,0);return oe(i)},[]),s=x.useRef(null);x.useRef(null),ge(i=>{s.current&&(s.current.rotation.y=Math.sin(i.clock.elapsedTime*.2)*.2,s.current.rotation.x=Math.cos(i.clock.elapsedTime*.2)*.1)});const n=-6+r/100*10;return a.jsxs("group",{ref:s,children:[t.map((i,l)=>{const o=i[0].clone(),c=i[1].clone();if(o.x>n){const u=Math.max(0,1-(o.x-n));o.y*=u,o.z*=u}if(c.x>n){const u=Math.max(0,1-(c.x-n));c.y*=u,c.z*=u}const f=c.x>n;return a.jsx(Ee,{points:[o,c],color:f?"#FF6B35":"#50E3C2",lineWidth:f?3:1,transparent:!0,opacity:f?1:.4},l)}),e.map((i,l)=>{const o=i.clone();if(o.x>n){const f=Math.max(0,1-(o.x-n));o.y*=f,o.z*=f}const c=o.x>n;return a.jsx(ye,{position:o,args:[.1,16,16],children:a.jsx("meshStandardMaterial",{color:c?"#FF6B35":"#50E3C2",emissive:c?"#FF6B35":"#50E3C2",emissiveIntensity:c?2:.5})},`node-${l}`)}),a.jsxs("mesh",{position:[n,0,0],children:[a.jsx("boxGeometry",{args:[.1,10,10]}),a.jsx("meshPhysicalMaterial",{color:"#FF6B35",transmission:.9,opacity:.5,transparent:!0,roughness:.1})]})]})}function Be(){const[r,e]=x.useState(80);return a.jsxs("div",{className:"my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#050505] overflow-hidden",children:[a.jsx("div",{className:"p-8 border-b border-white/10 bg-[#0D0D0B] flex flex-col md:flex-row justify-between items-end gap-6 relative z-10",children:a.jsxs("div",{className:"flex-1 w-full",children:[a.jsx("label",{className:"font-mono text-xs tracking-widest uppercase text-white/50 block mb-4",children:"Constraint Wall Slider"}),a.jsx("input",{type:"range",min:"0",max:"100",value:r,onChange:t=>e(Number(t.target.value)),className:"w-full accent-[#FF6B35]"}),a.jsxs("div",{className:"flex justify-between mt-2 font-mono text-[10px] text-white/30",children:[a.jsx("span",{children:"Early Clamping"}),a.jsx("span",{children:"Unconstrained (State -1)"})]})]})}),a.jsxs("div",{className:"relative h-[400px] w-full cursor-crosshair",children:[a.jsx("div",{className:"absolute inset-0 z-0 opacity-20 pointer-events-none",style:{backgroundImage:"radial-gradient(ellipse at center, #50E3C2 0%, transparent 70%)"}}),a.jsx(x.Suspense,{fallback:a.jsx("div",{className:"absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs tracking-widest",children:"LOADING GRAPH PHYSICS..."}),children:a.jsxs(me,{camera:{position:[0,2,8],fov:60},children:[a.jsx("ambientLight",{intensity:.2}),a.jsx("directionalLight",{position:[5,10,5],intensity:1}),a.jsx(Se,{preset:"city"}),a.jsx(Le,{constraintX:r}),a.jsx(ve,{children:a.jsx(xe,{luminanceThreshold:.2,mipmapBlur:!0,intensity:1.5})})]})}),a.jsx("div",{className:"absolute top-6 left-6 font-mono text-[10px] text-[#50E3C2]/50 tracking-widest uppercase",children:"Prompt In"}),a.jsx("div",{className:"absolute bottom-6 right-6 font-mono text-sm text-[#FF6B35] font-bold bg-[#111]/80 backdrop-blur border border-white/10 px-4 py-2 rounded",children:r<50?'{"answer": 42}':"<chaotic_output>"})]})]})}export{Be as default};
