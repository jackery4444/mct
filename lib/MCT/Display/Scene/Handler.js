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

// display scene handler class

MCT.DisplaySceneHandler = function(pixi) {
  this.pixi = pixi;
  this.scenes = {};
}

MCT.DisplaySceneHandler.prototype.constructor = MCT.DisplaySceneHandler;

MCT.DisplaySceneHandler.prototype.addScene = function(name, elements) {
  this.scenes[name] = new MCT.DisplayScene(this.pixi);

  // use elements with layout objects to use them in the new scene
  if (elements instanceof MCT.Element) {
    // single element in elements
    this.scenes[name].addLayout(elements.layout);
  } else {
    // supports up to one indent level in elements
    for (var pp in elements) {
      if (!(elements[pp] instanceof MCT.Element)) {
        for (var ppp in elements[pp]) {
          this.scenes[name].addLayout(elements[pp][ppp].layout);
        }
      } else {
        if (elements[pp].layout instanceof MCT.Layout) {
          this.scenes[name].addLayout(elements[pp].layout);
        }
      }
    }
  }
  this.scenes[name].update();
}