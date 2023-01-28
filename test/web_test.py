from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
import time
import decimal

#Checker function
def checker(expected_val, output_val):
    dec_points = abs(decimal.Decimal(float(str(expected_val))).as_tuple().exponent)
    output_val = round(float(output_val), dec_points)
    try:
        comparator = abs(float(output_val)/float(expected_val)) - 1
    except:
        comparator = float(output_val) - float(expected_val)
    
    if comparator <= 1e-3:
            text_return = "OK!"
    else:
        text_return = "NG!"
    return text_return



#Selenium modifications
options = webdriver.ChromeOptions() 
options.add_argument("start-maximized")
# to supress the error messages/logs
options.add_experimental_option('excludeSwitches', ['enable-logging'])

#Opening localhost:5502
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://127.0.0.1:5502")


#Click on main button
main_button = driver.find_element(By.XPATH, "//div[@view_id='main_btn']")
main_button.click()

#Click on mass to volume converter
mv_converter = driver.find_element(By.XPATH, "//div[@view_id='mass_vol']")
mv_converter.click()

test_values = [1234, 5, 0, 0.0001, 0.5, 0.00000004, 1385666735, -7533, -0.64234, -1]
density_values = [1001, 123, 56, 0, -12, 10000034, 0.00001, 0.445, -0.2]
mass_units = ["kg/s", "kg/min", "kg/h", "lb/s", "lb/min", "lb/h"]
vol_units = ["m3/h", "l/s", "l/min","usgpm","ft3/h"]
rho_units = ["kg/m3", "kg/l", "g/l", "lb/ft3"]

print("START OF TEST for " + driver.title)
#TEST: Mass to Volume
print("--------------- START: Mass to Volume Value Input Test ---------------")
m2v_exp_res_val = [4442.4, 18, 0, 0.00036, 1.8, 1.4400000000000002e-07, 4988400246.0, -27118.8, -2.312424, -3.6]
for i in range(len(test_values)):
    time.sleep(0.1)
    input_val = driver.find_element(By.XPATH, "//div[@view_id='mv_inp_field']/div/input")
    input_val.click()
    input_val.send_keys(Keys.BACKSPACE)
    input_val.clear()
    input_val.send_keys(str(test_values[i]))

    convert_button = driver.find_element(By.XPATH, "//div[@view_id='mv_convert_btn']/div/button")
    convert_button.click()

    output_val = driver.find_element(By.XPATH, "//div[@view_id='mv_out_field']/div/input").get_attribute("value")

    text_log = "Output: {}, Expected: {}, Remarks: {}".format(output_val, m2v_exp_res_val[i], checker(m2v_exp_res_val[i], output_val))
    print(text_log)
print("--------------- END: Mass to Volume Value Input Test ---------------")


print("--------------- START: Mass to Volume Select Input Test ---------------")
input_val.click()
input_val.send_keys(Keys.BACKSPACE)
input_val.clear()
input_val.send_keys(str(1000))
m2v_exp_res_sel = [3600, 60, 1, 1632.9, 27.216, 0.45359]
for i in range(len(mass_units)):
    time.sleep(0.1)
    input_selection = Select(driver.find_element(By.XPATH, "//div[@view_id='mv_inp_select']/div/select"))
    input_selection.select_by_value(mass_units[i])
    
    convert_button = driver.find_element(By.XPATH, "//div[@view_id='mv_convert_btn']/div/button")
    convert_button.click()

    output_val = driver.find_element(By.XPATH, "//div[@view_id='mv_out_field']/div/input").get_attribute("value")

    text_log = "Output: {}, Expected: {}, Remarks: {}".format(output_val, m2v_exp_res_sel[i], checker(m2v_exp_res_sel[i], output_val))
    print(text_log)
print("--------------- END: Mass to Volume Select Input Test ---------------")



#TEST: Unit Swap Icon Functionality
#For visual confirmation of functionality
print("--------------- START: Unit Swap Test ---------------")
time.sleep(5)
#Single click action
#Expected output: Message prompt on default units, Mass component swaped with Volume components
print("<<<<< Single Click Action >>>>>")
exchange_button = driver.find_element(By.XPATH, "//div[@view_id='exchange']/div/button")
exchange_button.click()
time.sleep(5)

#Double click action
#Expected output: Message prompt on default units, 2 x visible unit swaps
print("<<<<< Double Click Action >>>>>")
for i in range(2):
    exchange_button = driver.find_element(By.XPATH, "//div[@view_id='exchange']/div/button")
    exchange_button.click()
    time.sleep(2)
time.sleep(5)
#Triple click action
#Expected output: 3 x Message prompt on default units, 3 x visible unit swaps
print("<<<<< Triple Click Action >>>>>")
for i in range(3):
    exchange_button = driver.find_element(By.XPATH, "//div[@view_id='exchange']/div/button")
    exchange_button.click()
    time.sleep(1)
time.sleep(5)

#Revert to Volume-Mass Mode
exchange_button = driver.find_element(By.XPATH, "//div[@view_id='exchange']/div/button")
exchange_button.click()
print("--------------- END: Unit Swap Test ---------------")


#TEST: Volume to Mass
print("--------------- START: Volume to Mass Value Input Test ---------------")
v2m_exp_res_val = [342.78052, 1.3889, 0.0, 2.7778000000000004e-05, 0.13889, 1.1111200000000002e-08, 384910505.64830005, -2092.51674, -0.17842920520000002, -0.27778]
for i in range(len(test_values)):
    time.sleep(0.1)
    input_val = driver.find_element(By.XPATH, "//div[@view_id='mv_inp_field']/div/input")
    input_val.click()
    input_val.send_keys(Keys.BACKSPACE)
    input_val.clear()
    input_val.send_keys(str(test_values[i]))

    convert_button = driver.find_element(By.XPATH, "//div[@view_id='mv_convert_btn']/div/button")
    convert_button.click()

    output_val = driver.find_element(By.XPATH, "//div[@view_id='mv_out_field']/div/input").get_attribute("value")

    text_log = "Output: {}, Expected: {}, Remarks: {}".format(output_val, v2m_exp_res_val[i], checker(v2m_exp_res_val[i], output_val))
    print(text_log)
print("--------------- END: Volume to Mass Value Input Test ---------------")


print("--------------- START: Volume to Mass Select Input Test ---------------")
input_val.click()
input_val.send_keys(Keys.BACKSPACE)
input_val.clear()
input_val.send_keys(str(1000))
v2m_exp_res_sel = [277.78, 1000, 16.667, 63.09, 7.8658]
for i in range(len(vol_units)):
    time.sleep(0.1)
    input_selection = Select(driver.find_element(By.XPATH, "//div[@view_id='mv_inp_select']/div/select"))
    input_selection.select_by_value(vol_units[i])
    
    convert_button = driver.find_element(By.XPATH, "//div[@view_id='mv_convert_btn']/div/button")
    convert_button.click()

    output_val = driver.find_element(By.XPATH, "//div[@view_id='mv_out_field']/div/input").get_attribute("value")

    text_log = "Output: {}, Expected: {}, Remarks: {}".format(output_val, v2m_exp_res_sel[i], checker(v2m_exp_res_sel[i], output_val))
    print(text_log)
print("--------------- END: Volume to Mass Select Input Test ---------------")

#TEST: Density
print("--------------- START: Density Value Input Test ---------------")
rho_exp_res_val = [7.8736657999999995, 0.9674934, 0.44048479999999995, 0, 0, 78658.26743719999, 7.8658e-08, 0.0035002809999999996, 0]
for i in range(len(density_values)):
    time.sleep(0.1)
    density_val = driver.find_element(By.XPATH, "//div[@view_id='mv_density_field']/div/input")
    density_val.click()
    density_val.send_keys(Keys.BACKSPACE)
    density_val.clear()
    density_val.send_keys(str(density_values[i]))

    convert_button = driver.find_element(By.XPATH, "//div[@view_id='mv_convert_btn']/div/button")
    convert_button.click()

    output_val = driver.find_element(By.XPATH, "//div[@view_id='mv_out_field']/div/input").get_attribute("value")

    if density_values[i] <= 0:
        alert_val = driver.find_element(By.XPATH, "//div[@role='alert'][1]")
        remarks = alert_val.get_attribute("class")
    else:
        remarks = checker(rho_exp_res_val[i], output_val)
    text_log = "Output: {}, Expected: {}, Remarks: {}".format(output_val, rho_exp_res_val[i], remarks)
    print(text_log)
print("--------------- END: Density Value Input Test ---------------")


print("--------------- START: Density Select Input Test ---------------")
density_val.click()
density_val.send_keys(Keys.BACKSPACE)
density_val.clear()
density_val.send_keys(str(1000))
rho_exp_res_sel = [7.865799999999999, 7865.8, 7.865799999999999, 126.0]
for i in range(len(rho_units)):
    time.sleep(0.1)
    density_selection = Select(driver.find_element(By.XPATH, "//div[@view_id='mv_density_select']/div/select"))
    density_selection.select_by_value(rho_units[i])
    
    convert_button = driver.find_element(By.XPATH, "//div[@view_id='mv_convert_btn']/div/button")
    convert_button.click()

    output_val = driver.find_element(By.XPATH, "//div[@view_id='mv_out_field']/div/input").get_attribute("value")

    text_log = "Output: {}, Expected: {}, Remarks: {}".format(output_val, rho_exp_res_sel[i], checker(rho_exp_res_sel[i], output_val))
    print(text_log)
print("--------------- END: Density Select Input Test ---------------")

print("END OF TEST for " + driver.title)

time.sleep(10)
