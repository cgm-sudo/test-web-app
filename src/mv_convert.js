var convert = require('convert-units');
const {mass_flow_units, vol_flow_units, density_units,
       mass_flow_SI, vol_flow_SI, density_SI} = require('./units');

var mv_mass_units = ["kg/s", "kg/min", "kg/h", "lb/s", "lb/min", "lb/h"];
var mv_input_select = {
    id: "mv_inp_select",
    view:"select",
    value:"kg/s",
    options:mv_mass_units,
    gravity:3
}

var mv_vol_units = ["m3/h", "l/s", "l/min","usgpm","ft3/h"];
var mv_output_select = {
    id:"mv_out_select",
    view:"select",
    value:"m3/h",
    options:mv_vol_units,
    gravity:3,
};

var mv_density_units = ["kg/m3", "kg/l", "g/l", "lb/ft3"];
var mv_density_select = {
  id:"mv_density_select",
  view:"select",
  value:"kg/m3",
  options:mv_density_units
};

var mv_input_label = {view:"label", label:"Mass", gravity:3, align:"center", id:"mv_inp_label"};
var mv_output_label = {view:"label", label:"Volume", gravity:3, align:"center", id:"mv_out_label"};
var mv_density_label = {view:"label", label:"Density", align:"center", id:"mv_density_label"};

var mv_input_field = {id:"mv_inp_field", view:"text", type:"number", value:"1", inputAlign:"left", gravity:3};
var mv_output_field = {id:"mv_out_field", view:"text", type:"number", value:"", inputAlign:"left", gravity:3};
var mv_density_field = {id:"mv_density_field", view:"text", type:"number", value:"1000", inputAlign:"left", gravity:3};

var mv_convert_button = {id:"mv_convert_btn", view:"button", value:"Convert!", css:"webix_primary", width:100, height:50, margin:25};

var mv_converter = {
    type:"space", width:800,
    rows:[
      {
        type:"clean",
        rows:[
          {
            borderless:true, view:"tabbar", id:"tabbar", value:"liq_view", multiview:true, options:[
              { value:'Liquid', id:'liq_view'},
              { value:'Gas', id:'gas_view'}
            ]
          },
          {
            cells:[
                    {id:"liq_view",
                     rows:[
                            {type:"section", template:"Conversion Input:"},
                            {cols:[
                                {gravity:0.25},
                                mv_input_label,
                                {gravity:1},
                                mv_output_label,
                                {gravity:0.25}
                            ]
                            },
                            {cols:[
                                {gravity:0.25},
                                mv_input_field,
                                {view:"label", label:"TO", gravity:1, height:50, width:50, align:"center"},
                                mv_output_field,
                                {gravity:0.25}
                            ]
                            },
                            {cols:[
                                {gravity:0.25},
                                mv_input_select,
                                { view:"icon", icon:"wxi-sync", align:"center", gravity:1, width:50, id:"exchange", tooltip:"Click to swap units"},
                                mv_output_select,
                                {gravity:0.25}
            
                            ]
                            },
                            {type:"section", template:"Required Input:"},
                            {cols:[
                                {},
                                mv_density_label,
                                mv_density_field,
                                mv_density_select,
                                {}
                            ]
                            },
                            {height:20},
                            {cols:[
                              {},
                              mv_convert_button,
                              {}
                            ]}
                            
              ]},
              {id:"gas_view", template:"test2-gas"}
            ]
          }
        ]
      }
    ]
  }


function mass2vol (input_value, input_unit, output_unit, density, density_unit) {
    let density_SI_conv_up = convert(1).from(density_units[density_unit].up1).to(density_SI.up1);
    let density_SI_conv_bt = convert(1).from(density_units[density_unit].bt1).to(density_SI.bt1);
    let density_SI_converted = density*(density_SI_conv_up/density_SI_conv_bt);

    let input_SI_conv_up = convert(1).from(mass_flow_units[input_unit].up1).to(mass_flow_SI.up1);
    let input_SI_conv_bt = convert(1).from(mass_flow_units[input_unit].bt1).to(mass_flow_SI.bt1);
    let input_SI_converted = input_value*(input_SI_conv_up/input_SI_conv_bt);

    // volume = mass/density
    let mass_to_vol_SI = input_SI_converted/density_SI_converted;
    
    let output_unit_conv_up = convert(1).from(vol_flow_SI.up1).to(vol_flow_units[output_unit].up1);
    let output_unit_conv_bt = convert(1).from(vol_flow_SI.bt1).to(vol_flow_units[output_unit].bt1);
    let output_converted = mass_to_vol_SI*(output_unit_conv_up/output_unit_conv_bt);

    return output_converted;
}

function vol2mass (input_value, input_unit, output_unit, density, density_unit) {
    let density_SI_conv_up = convert(1).from(density_units[density_unit].up1).to(density_SI.up1);
    let density_SI_conv_bt = convert(1).from(density_units[density_unit].bt1).to(density_SI.bt1);
    let density_SI_converted = density*(density_SI_conv_up/density_SI_conv_bt);

    let input_SI_conv_up = convert(1).from(vol_flow_units[input_unit].up1).to(vol_flow_SI.up1);
    let input_SI_conv_bt = convert(1).from(vol_flow_units[input_unit].bt1).to(vol_flow_SI.bt1);
    let input_SI_converted = input_value*(input_SI_conv_up/input_SI_conv_bt);

    // mass = volume*density
    let vol_to_mass_SI = input_SI_converted*density_SI_converted;
    
    let output_unit_conv_up = convert(1).from(mass_flow_SI.up1).to(mass_flow_units[output_unit].up1);
    let output_unit_conv_bt = convert(1).from(mass_flow_SI.bt1).to(mass_flow_units[output_unit].bt1);
    let output_converted = vol_to_mass_SI*(output_unit_conv_up/output_unit_conv_bt);

    return output_converted;
}

module.exports = {mv_converter, mass2vol, vol2mass};