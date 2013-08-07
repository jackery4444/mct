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

baseGameInitPlayer();

function baseGameInitPlayer() {

  // player test 1
  var player = new MCT.Player('yokumosata');
  player.turn();

  // player cpu test 1
  var playerCpu = new MCT.PlayerCpu();
  playerCpu.turn();

}

// planet initialization just for first planet earth/anuka yet
function baseGameInitPlanet() {
  $.ajaxSetup({async:false});

  try {
    mct.data.technologies = baseLoadJSON("./lib/data/technologies.json");

    var data = baseLoadJSON("./lib/data/planets.json");
    mct.data.planets = data.data;
    for (var i = 0; i < mct.data.planets.length; i++) {
      mct.data.planets[i].companies = {
        names : {},
        valid : {}
      };
      var handle = mct.data.planets[i].handle;
      mct.data.planets[mct.status.planet].companies.names.hardware = {
        used : [], data : baseLoadJSON("./lib/data/planets/" + handle + "/companies/hardware/names.json")
      };
      mct.data.planets[mct.status.planet].companies.names.software = {
        used : [], data : baseLoadJSON("./lib/data/planets/" + handle + "/companies/software/names.json")
      };
      mct.data.planets[mct.status.planet].companies.names.advertisements = {
        used : [], data : baseLoadJSON("./lib/data/planets/" + handle + "/companies/advertisements/names.json")
      };
      mct.data.planets[mct.status.planet].companies.names.drugs = {
        used : [], data : baseLoadJSON("./lib/data/planets/" + handle + "/companies/drugs/names.json")
      };
      mct.data.events.list = {
        used : [], data : baseLoadJSON("./lib/data/events/sandbox.json")
      };
    }
  } catch(err) {
    console.log("Failed to load json configuration files.");
  }

  mct.data.planets[mct.status.planet].object = new MCT.Planet(
    mct.data.planets[mct.status.planet].name[mct.data.planets[mct.status.planet].storyVersion], 1.0, 1.0
  );

  baseGameInitPlanetCompanies();
}

// initialize random companies on planet, for earth/anuka only yet
function baseGameInitPlanetCompanies() {
  var randomNameNo = -1;

  // go through all fields to collect technology definitions in relation to companies and their amount
  for (var fp in mct.data.technologies.fields) {
    // add companies for each field type
    if (mct.data.technologies.fields[fp].companies.for == "type") {
      mct.data.planets[mct.status.planet].companies.valid[fp] = {};

      for (var tp in mct.data.technologies.fields[fp].types) {
        mct.data.planets[mct.status.planet].companies.valid[fp][tp] = [];
        for (var i = 0; i < mct.data.technologies.fields[fp].companies.amount; i++) {
          randomNameNo = -1;
          do {
            randomNameNo = Math.floor(Math.random() * 1000);
          } while (mct.data.planets[mct.status.planet].companies.names[fp].used.indexOf(randomNameNo) > -1);
          mct.data.planets[mct.status.planet].companies.names[fp].used.push(randomNameNo);
          mct.data.planets[mct.status.planet].companies.valid[fp][tp].push(
            { name : mct.data.planets[mct.status.planet].companies.names[fp].data[randomNameNo] }
          );
        }
      }
    } else {
      // add companies for all field types
      mct.data.planets[mct.status.planet].companies.valid[fp] = [];

      for (var i = 0; i < mct.data.technologies.fields[fp].companies.amount; i++) {
        randomNameNo = -1;
        do {
          randomNameNo = Math.floor(Math.random() * 1000);
        } while (mct.data.planets[mct.status.planet].companies.names[fp].used.indexOf(randomNameNo) > -1);
        mct.data.planets[mct.status.planet].companies.names[fp].used.push(randomNameNo);

        var company = { name : mct.data.planets[mct.status.planet].companies.names[fp].data[randomNameNo] };
        for (var tp in mct.data.technologies.fields[fp].types) {
          company[tp] = true;
        }
        mct.data.planets[mct.status.planet].companies.valid[fp].push(company);
      }
    }
  }
}