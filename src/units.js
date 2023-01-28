var mass_flow_SI = {'id':'kg/s', 'up1':'kg', 'bt1':'s'};
var mass_flow_units = {
    'kg/s':{'id':'kg/s', 'up1':'kg', 'bt1':'s'},
    'kg/min':{'id':'kg/min', 'up1':'kg', 'bt1':'min'},
    'kg/h':{'id':'kg/h', 'up1':'kg', 'bt1':'h'},
    'lb/s':{'id':'lb/s', 'up1':'lb', 'bt1':'s'},
    'lb/min':{'id':'lb/min', 'up1':'lb', 'bt1':'min'},
    'lb/h':{'id':'lb/h', 'up1':'lb', 'bt1':'h'},
};

var vol_flow_SI = {'id':'m3/h', 'up1':'m3', 'bt1':'s'};
var vol_flow_units = {
    'm3/s':{'id':'m3/h', 'up1':'m3', 'bt1':'s'},
    'm3/min':{'id':'m3/h', 'up1':'m3', 'bt1':'min'},
    'm3/h':{'id':'m3/h', 'up1':'m3', 'bt1':'h'},
    'ft3/s':{'id':'ft3/h', 'up1':'ft3', 'bt1':'s'},
    'ft3/min':{'id':'ft3/h', 'up1':'ft3', 'bt1':'min'},
    'ft3/h':{'id':'ft3/h', 'up1':'ft3', 'bt1':'h'},
    'l/s':{'id':'l/h', 'up1':'l', 'bt1':'s'},
    'l/min':{'id':'l/h', 'up1':'l', 'bt1':'min'},
    'l/h':{'id':'l/h', 'up1':'l', 'bt1':'h'},
    'usgpm':{'id':'usgpm', 'up1':'gal', 'bt1':'min'}
};

var density_SI = {'id':'kg/m3', 'up1':'kg', 'bt1':'m3'};
var density_units = {
    'kg/m3':{'id':'kg/m3','up1':'kg', 'bt1':'m3'},
    'kg/l':{'id':'kg/l', 'up1':'kg', 'bt1':'l'},
    'g/l':{'id':'g/l', 'up1':'g', 'bt1':'l'},
    'lb/ft3':{'id':'lb/ft3', 'up1':'lb', 'bt1':'ft3'},
    'lb/in3':{'id':'lb/in3', 'up1':'lb', 'bt1':'in3'},
}
module.exports = {mass_flow_SI, vol_flow_SI, density_SI,
                  mass_flow_units, vol_flow_units, density_units};