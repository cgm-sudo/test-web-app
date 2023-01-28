var {mv_converter, mass2vol, vol2mass} = require('./mv_convert');

webix.ui({rows:[
    {},
    {cols:[
        {},
        {view:"button", id:"main_btn", 
         label:"<i class='webix_icon wxi-sync' style='font-size:30px;'></i>" +
               "<h1 style='margin:0'>Unit Converter</h1>", 
         tooltip:"Click to start converting!", 
         css:"webix_primary",
         autowidth:true, height:100},
        {}
    ]},
    {}
]  
})

var conv_dict = {
    "conv1": mv_converter,
    "conv2": "Pressure/Head",
    "conv3": "Other Conversion 01",
    "conv4": "Other Conversion 02",
    "conv5": "Other Conversion 03" 
};

function viewGen(item1,item2,tool_desc,given_id){
  var view_out = {view:"button", id:given_id, 
  label:`<h3 style='margin:0'>${item1}</h3>` +
  `<i class='webix_icon wxi-sync' style='font-size:30px;'></i>` +
        `<h3 style='margin:0'>${item2}</h3>`, 
  css:"webix_primary",
  tooltip:`${tool_desc} (v/v)`,
  width:100, height:100, margin:20
  }
  return view_out
}

var mass2flow = viewGen('Mass', "Volume", 'Mass to Volume Flowrate','mass_vol');
var press2head = viewGen('Pressure', "Head", 'Pressure to Head','press_head');
var test3 = viewGen('Test', "Three", 'Test No. 3','test3');
var test4 = viewGen('Test', "Four", 'Test No. 4','test4');
var test5 = viewGen('Test', "Five", 'Test No. 5','test5');
var test6 = viewGen('Test', "Six", 'Test No. 6','test6');

webix.ui({
    view:"window",
    id: "uconv",
    head:"Unit Converter",
    position:"center",
    close:true,
    move:true,
    padding:50,
    body:{rows:[
      {cols:[
      {},
      mass2flow,
      press2head,
      test3,
    {}
    ]},
    {cols:[
      {},
      test4,
      test5,
      test6,
    {}
    ]}

  ]
          }
      }).hide()

$$("main_btn").attachEvent("onItemClick",function(){
    $$('uconv').show();})

webix.ui({
  view:"window",
  id: "massconv",
  head:"Mass to Volume Flowrate",
  position:"center",
  close:true,
  resize:true,
  move:true,
  maxHeight:500,
  maxWidth:1000,
  body:mv_converter
  }).hide()

$$("mass_vol").attachEvent("onItemClick",function(id){
  $$('massconv').show();
  $$('uconv').hide()})

// Value swap functionality
$$("exchange").attachEvent("onItemClick", function(){
  let temp_val = $$("mv_inp_field").getValue();
  $$("mv_inp_field").setValue($$("mv_out_field").getValue());
  $$("mv_out_field").setValue(temp_val);

  let mass_arr = [];
  for (let i = 0, len = $$("mv_inp_select").config.options.length; i < len; i++) {
      mass_arr.push($$("mv_inp_select").config.options[i].value)};
  
  let vol_arr = [];
  for (let i = 0, len = $$("mv_out_select").config.options.length; i < len; i++) {
      vol_arr.push($$("mv_out_select").config.options[i].value)};

  let temp_sel = mass_arr;
  $$("mv_inp_select").define("options",vol_arr);
  $$("mv_inp_select").setValue(vol_arr[0]);
  $$("mv_inp_select").refresh();
  $$("mv_out_select").define("options",temp_sel);
  $$("mv_out_select").setValue(mass_arr[0]);
  $$("mv_out_select").refresh();

  let temp_label = $$("mv_inp_label").data.label;
  $$("mv_inp_label").define("label",$$("mv_out_label").data.label);
  $$("mv_inp_label").refresh();
  $$("mv_out_label").define("label",temp_label);
  $$("mv_out_label").refresh();

  webix.message(`Changed to default unit! - Input: (${$$("mv_inp_select").data.value})
                 Output: (${$$("mv_out_select").data.value})`);
});

webix.attachEvent("onClick", function(){
  var input_selected = $$("mv_inp_select").data.value;
  var output_selected = $$("mv_out_select").data.value;
  var density_selected = $$("mv_density_select").data.value;
  var inp_val = $$("mv_inp_field").getValue();

  //Density data validation
  var density_val = $$("mv_density_field").getValue();
  if (density_val == 0){
    webix.message("Density must be greater than zero!");
    $$("mv_density_field").setValue(1000);
  } else if (density_val < 0) {
    webix.message("Density must be greater than zero!");
    $$("mv_density_field").setValue(Math.abs(density_val));
  }
  density_val = $$("mv_density_field").getValue();

  var inp_label = $$("mv_inp_label").data.label;
  if (inp_label === "Mass"){
    $$("mv_out_field").setValue(mass2vol(
      inp_val,
      input_selected,
      output_selected,
      density_val,
      density_selected
    ));
  } else if (inp_label === "Volume"){
    $$("mv_out_field").setValue(vol2mass(
      inp_val,
      input_selected,
      output_selected,
      density_val,
      density_selected
    ));
  }
})