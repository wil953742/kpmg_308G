from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as soup
import pandas as pd
import joblib

import json


class crawler:
    def __init__(self):
        drv_opts = Options()
        drv_opts.add_argument("--no-sandbox")
        drv_opts.add_argument("--headless")
        drv_opts.add_argument("--disable-gpu")
        drv_opts.add_argument("--disable-dev-shm-usage")
        drv_opts.add_argument("--remote-debugging-port=9222")
        drv_opts.add_argument("--single-process")
        self.driver = webdriver.Chrome(
            executable_path="/usr/local/share/chromedriver", options=drv_opts)

    def quit_chrome(self):
        self.driver.quit()

    def crawl(self, url, body):
        # body = {[SEX, UPPER, SHOULDER, ARM, WAIST, LEG]}
        self.__init__()
        self.driver.get(url)
        try:
            WebDriverWait(self.driver, timeout=1).until(
                EC.presence_of_element_located((By.XPATH, '//*[@id="default_top"]/div[1]/h1/a')))
        except:
            print("Page does not exist or does not load")
            self.quit_chrome()
            return False, 0

        prod_details = [x.text for x in self.driver.find_elements_by_xpath(
            '//div[3]/div[3]/div[1]/p/a')]

        print(prod_details)

        if len(prod_details) == 2:
            category, brand_name_kor = prod_details
            detailed_category = None
        elif len(prod_details) == 3:
            category, detailed_category, brand_name_kor = prod_details
        else:
            self.quit_chrome()
            return False, 1

        prod_data = self.driver.find_elements_by_xpath(
            '//*[@class="product_article_contents"]/strong')

        if len(prod_data) == 0:
            self.quit_chrome()
            return False, 2
        else:
            prod_data = soup(prod_data[0].get_attribute(
                'outerHTML'), features="html.parser")
            brand_name_eng = prod_data.select('a')[0].extract().text
            prod_data.select('span')[0].extract()
            prod_num = 'MUS_' + prod_data.text.replace(' ', '')

        try:
            prod_sex = self.driver.find_elements_by_xpath(
                '//*[@class="txt_gender"]/span')[0].text
        except IndexError:
            prod_sex = None
            pass

        try:
            size_chart_columns = self.driver.find_elements_by_xpath(
                '//*[@id="size_table"]/thead/tr/th')
            size_data = soup(
                self.driver.find_elements_by_xpath(
                    '//*[@id="size_table"]/tbody')[0].get_attribute('outerHTML'),
                features="html.parser")
            rmv = size_data.find_all('tr', class_='order_size_save')
            [removal.extract() for removal in rmv]
            rmv = size_data.find_all('tr', id='mysize')
            [removal.extract() for removal in rmv]
            size_dict = {'Metrics': size_chart_columns[0].text,
                         'Columns': [x.text for x in size_chart_columns]}
            for i in range(1, len(size_chart_columns)):
                size_dict[size_data.select('tr')[i].select('th')[0].text] = [x.text for x in
                                                                             size_data.select('tr')[i].select('td')]
        except:
            self.quit_chrome()
            return False, 3

        info = {'category': category,
                'detailed_category': detailed_category,
                'brand_name_korean': brand_name_kor,
                'brand_name_english': brand_name_eng,
                'product_sex': prod_sex,
                'size_table': size_dict}

        self.quit_chrome()

        if (category == "?????? ??????" or category == "????????? ??????"):
            Sex = [1 for x in range(len(size_dict[0]))]
            Reviewer_Sex = [1 for x in range(len(size_dict[0]))]
            Height = [x for x= body[0] in range(len(size_dict[0]))]
            Weight = [x for x= body[1] in range(len(size_dict[0]))]
            Upper = size_dict[1]
            Shoulder = size_dict[2]
            Chest = size_dict[3]
            Arm = size_dict[4]

            # Put Data in the Lists above
            test = pd.DataFrame(list(zip(sex, Reviewer_Sex, Height, Weight, Upper, Shoulder, Chest, Arm)),
                                columns=['sex', 'Reviewer_Sex', 'Height', 'Weight', 'Upper', 'Shoulder', 'Chest', 'Arm'])
            if (category == "?????? ??????"):
                model = joblib.load('hoody_model.pkl')
            else:
                model = joblib.load('coat_model.pkl')
            result = model.predict_proba(test)

        # response back the result
        else:
            Sex = [1 for x in range(len(size_dict[0]))]
            Reviewer_Sex = [1 for x in range(len(size_dict[0]))]
            Height = [x for x= body[0] in range(len(size_dict[0]))]
            Weight = [x for x= body[1] in range(len(size_dict[0]))]
            Leg = size_dict[1]
            Waist = size_dict[2]
            Thigh = size_dict[3]
            Bot_Len = size_dict[4]
            Bot_Area = size_dict[5]
            model = joblib.load('jean_model.pkl')
            test = pd.DataFrame(list(zip(sex, Reviewer_Sex, Height, Weight, Leg, Waist, Thigh, Bot_Len, Bot_Area)),
                                columns=['sex', 'Reviewer_Sex', 'Height', 'Weight', 'Leg', 'Waist', 'Thigh', 'Bot_Len', 'Bot_Area'])
            result = model.predict_proba(test)
            # response back the result
        info['ml'] = result


return json.dumps(info), None
