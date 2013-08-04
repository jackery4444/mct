/*
 * This file is part of Mass Control Tycoon.
 * Copyright 2013-2014 by MCT Team (see TEAM file) - All rights reserved.
 * Project page @ https://github.com/mctteam/mct
 * Author(s) Martin Kelm
 *
 * Mass Control Tycoon is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Mass Control Tycoon is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Mass Control Tycoon. If not, see <http://www.gnu.org/licenses/>.
 */

// display scene class

MCT.DisplayScene = function(pixi) {
  if (typeof pixi == "undefined") {
    throw new Error("MCT.DisplayScene, broken pixi dependency.");
  }
  this.pixi = pixi; // pixi elements from game class
  // a scene contains layouts of game elements to perform display actions on their displayObjects
  this.layouts = []; // array list
}

MCT.DisplayScene.prototype.constructor = MCT.DisplayScene;

MCT.DisplayScene.prototype.update = function() {
  // update scene contents in stage depending on visible layout display objects
  // can add missing display objects only yet
  // todo: DisplayObjects need a status change flag, to make status change checks easier
  for (var i = 0; i < this.layouts.length; i++) {
   // console.log(this.layouts);
    for (var j = 0; j < this.layouts[i].parts.length; j++) {
      if (this.layouts[i].parts[j].displayObject !== null &&
          this.layouts[i].parts[j].displayObject.getVisibility() == true) {
        if (this.pixi.stage.children.indexOf(this.layouts[i].parts[j].displayObject) == -1) {
          this.pixi.stage.addChild(this.layouts[i].parts[j].displayObject.container);
        }
      }
    }
  }
}

MCT.DisplayScene.prototype.addLayout = function(layout) {
  this.layouts.push(layout);
}

MCT.DisplayScene.prototype.removeLayout = function(id, partId, keepInBackground) {
  // removes layout / layout part from scene
  if (partId > -1) {
    pixi.stage.removeChild(this.layouts[id].parts[partId].displayObject);
    if (keepInBackground !== true) {
      this.layouts[id].displayObjects.remove(this.layouts[id].parts[partId].displayObject);
    }
  } else {
    for (var partId = 0; partId < this.layouts[id].parts.length; partId++) {
      pixi.stage.removeChild(this.layouts[id].parts[partId].displayObject);
      if (keepInBackground !== true) {
        this.layouts[id].displayObjects.remove(this.layouts[id].parts[partId].displayObject);
      }
    }
  }
}