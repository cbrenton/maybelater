'use strict';

import {m4, primitives} from 'twgl.js';

import * as util from 'util/scene-helpers.js';
import {Material} from 'scene/material.js'
import {RenderableInterface} from 'scene/renderable-interface.js';

export class Primitive extends RenderableInterface {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLProgram} programInfo
   * @param {string} type one of 'cube', 'sphere', 'plane'
   * @param {Material} material
   * @param {m4} transform
   */
  constructor(gl, type, material, transform) {
    super(gl, transform);
    switch (type) {
      case 'cube':
        this.bufferInfo = primitives.createCubeBufferInfo(this.gl, 1);
        break;
      case 'sphere':
        this.bufferInfo =
            primitives.createSphereBufferInfo(this.gl, 0.5, 24, 12);
        break;
      case 'plane':
        this.bufferInfo = primitives.createPlaneBufferInfo(this.gl, 1, 1);
        break;
      default:
        throw new Error(`Undefined primitive ${type}`);
    }
    this.tag = `primitive.${type}`;
    this.material = material;
  }

  get uniforms() {
    const uniforms = {
      u_modelMatrix: this.transform,
    };

    Object.assign(uniforms, this.material.uniforms);

    return uniforms;
  }

  /**
   * Render using a WebGL context and a specific camera.
   * @param {Object} globalUniforms uniforms passed from SceneManager applicable
   *     to all objects
   */
  draw(globalUniforms, overrideProgramInfo) {
    util.drawBuffer(
        this.gl, overrideProgramInfo, this.bufferInfo, this.uniforms,
        globalUniforms);
  }
}