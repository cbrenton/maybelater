'use strict';

import {GLContextManager} from 'managers/gl-context-manager.js';

export const TextureManager = {
  init_: function() {
    if (this.textures_ === undefined) {
      this.textures_ = createTextures(GLContextManager.gl);
    }
  },
  texture: function(textureName) {
    this.init_();
    return this.textures_[textureName];
  },
  get textures() {
    this.init_();
    return this.textures_;
  }
};

function createTextures(gl) {
  const textures = {};

  const checkerboardTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, checkerboardTexture);
  gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.LUMINANCE, 8, 8, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE,
      new Uint8Array([
        0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xCC, 0xFF, 0xCC,
        0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC,
        0xFF, 0xCC, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xFF,
        0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xCC, 0xFF, 0xCC, 0xFF,
        0xCC, 0xFF, 0xCC, 0xFF, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF,
        0xCC, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF, 0xCC, 0xFF,
      ]));
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  textures.checkerboardTexture = checkerboardTexture;

  const blackCheckerboardTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, blackCheckerboardTexture);
  gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.LUMINANCE, 8, 8, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE,
      new Uint8Array([
        0x00, 0xA3, 0x00, 0xA3, 0x00, 0xA3, 0x00, 0xA3, 0xA3, 0x00, 0xA3,
        0x00, 0xA3, 0x00, 0xA3, 0x00, 0x00, 0xA3, 0x00, 0xA3, 0x00, 0xA3,
        0x00, 0xA3, 0xA3, 0x00, 0xA3, 0x00, 0xA3, 0x00, 0xA3, 0x00, 0x00,
        0xA3, 0x00, 0xA3, 0x00, 0xA3, 0x00, 0xA3, 0xA3, 0x00, 0xA3, 0x00,
        0xA3, 0x00, 0xA3, 0x00, 0x00, 0xA3, 0x00, 0xA3, 0x00, 0xA3, 0x00,
        0xA3, 0xA3, 0x00, 0xA3, 0x00, 0xA3, 0x00, 0xA3, 0x00,
      ]));
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  textures.blackCheckerboardTexture = blackCheckerboardTexture;

  const blankTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, blankTexture);
  gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.LUMINANCE, 1, 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE,
      new Uint8Array([0xFF]));

  textures.blankTexture = blankTexture;

  // Load uv checker texture
  // @TODO: add support for loading multiple textures
  const imgTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, imgTexture);
  gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([0x00, 0x00, 0xFF, 0xFF]));
  var image = new Image();
  image.src = 'resources/uvcheck.png';
  image.addEventListener('load', function() {
    gl.bindTexture(gl.TEXTURE_2D, imgTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
  });
  textures.uvcheck = imgTexture;

  gl.bindTexture(gl.TEXTURE_2D, null);

  return textures;
};