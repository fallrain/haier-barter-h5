const province = [{id: '51', value: '四川省'}, {id: '22', value: '吉林省'}, {
  id: '15',
  value: '内蒙古自治区'
}, {id: '50', value: '重庆市'}, {id: '53', value: '云南省'}, {id: '43', value: '湖南省'}, {
  id: '52',
  value: '贵州省'
}, {id: '44', value: '广东省'}, {id: '23', value: '黑龙江省'}, {id: '34', value: '安徽省'}, {
  id: '46',
  value: '海南省'
}, {id: '33', value: '浙江省'}, {id: '37', value: '山东省'}, {id: '21', value: '辽宁省'}, {
  id: '62',
  value: '甘肃省'
}, {id: '36', value: '江西省'}, {id: '45', value: '广西壮族自治区'}, {id: '35', value: '福建省'}, {
  id: '31',
  value: '上海市'
}, {id: '13', value: '河北省'}, {id: '12', value: '天津市'}, {id: '14', value: '山西省'}, {
  id: '42',
  value: '湖北省'
}, {id: '32', value: '江苏省'}, {id: '65', value: '新疆维吾尔自治区'}, {id: '63', value: '青海省'}, {
  id: '54',
  value: '西藏自治区'
}, {id: '64', value: '宁夏回族自治区'}, {id: '61', value: '陕西省'}, {id: '41', value: '河南省'}, {
  id: '11',
  value: '北京市'
}];
const city = [
  {pro_code: '51', id: '233', value: '成都市'},
  {pro_code: '51', id: '143', value: '广元市'},
  {pro_code: '51', id: '33', value: '绵阳市'},
  {pro_code: '51', id: '337', value: '德阳市'},
  {pro_code: '51', id: '193', value: '甘孜藏族自治州'},
  {pro_code: '51', id: '69', value: '南充市'},
  {pro_code: '51', id: '153', value: '遂宁市'},
  {pro_code: '51', id: '111', value: '内江市'},
  {pro_code: '51', id: '271', value: '乐山市'},
  {pro_code: '51', id: '128', value: '自贡市'},
  {pro_code: '51', id: '63', value: '巴中市'},
  {pro_code: '51', id: '325', value: '资阳市'},
  {pro_code: '51', id: '201', value: '眉山市'},
  {pro_code: '51', id: '269', value: '雅安市'},
  {pro_code: '51', id: '61', value: '阿坝藏族羌族自治州'},
  {pro_code: '22', id: '327', value: '长春市'},
  {pro_code: '22', id: '18', value: '白城市'},
  {pro_code: '22', id: '282', value: '松原市'},
  {pro_code: '22', id: '60', value: '吉林市'},
  {pro_code: '22', id: '194', value: '四平市'},
  {pro_code: '22', id: '17', value: '辽源市'},
  {pro_code: '22', id: '141', value: '通化市'},
  {pro_code: '22', id: '142', value: '白山市'},
  {pro_code: '22', id: '6', value: '延边朝鲜族自治州'},
  {pro_code: '15', id: '55', value: '兴安盟'},
  {pro_code: '50', id: '3', value: '重庆市辖区'},
  {pro_code: '50', id: '348', value: '重庆市郊区'},
  {pro_code: '51', id: '250', value: '达州市'}, {pro_code: '51', id: '40', value: '广安市'}, {
    pro_code: '51',
    id: '300',
    value: '宜宾市'
  }, {pro_code: '51', id: '124', value: '泸州市'}, {pro_code: '53', id: '112', value: '昭通市'}, {
    pro_code: '43',
    id: '113',
    value: '长沙市'
  }, {pro_code: '43', id: '39', value: '张家界市'}, {pro_code: '43', id: '261', value: '常德市'}, {
    pro_code: '43',
    id: '252',
    value: '益阳市'
  }, {pro_code: '43', id: '263', value: '岳阳市'}, {pro_code: '43', id: '231', value: '株洲市'}, {
    pro_code: '43',
    id: '150',
    value: '湘潭市'
  }, {pro_code: '43', id: '326', value: '衡阳市'}, {pro_code: '43', id: '209', value: '郴州市'}, {
    pro_code: '43',
    id: '159',
    value: '永州市'
  }, {pro_code: '43', id: '275', value: '邵阳市'}, {pro_code: '43', id: '62', value: '怀化市'}, {
    pro_code: '43',
    id: '147',
    value: '娄底市'
  }, {pro_code: '43', id: '204', value: '湘西土家族苗族自治州'}, {
    pro_code: '52',
    id: '59',
    value: '贵阳市'
  }, {pro_code: '52', id: '94', value: '六盘水市'}, {pro_code: '52', id: '58', value: '遵义市'}, {
    pro_code: '52',
    id: '253',
    value: '安顺市'
  }, {pro_code: '52', id: '205', value: '毕节市'}, {pro_code: '52', id: '57', value: '铜仁市'}, {
    pro_code: '52',
    id: '56',
    value: '黔东南苗族侗族自治州'
  }, {pro_code: '52', id: '146', value: '黔南布依族苗族自治州'}, {
    pro_code: '52',
    id: '114',
    value: '黔西南布依族苗族自治州'
  }, {pro_code: '44', id: '19', value: '潮州市'}, {pro_code: '44', id: '92', value: '东莞市'}, {
    pro_code: '44',
    id: '137',
    value: '佛山市'
  }, {pro_code: '44', id: '294', value: '广州市'}, {pro_code: '44', id: '301', value: '河源市'}, {
    pro_code: '44',
    id: '293',
    value: '惠州市'
  }, {pro_code: '44', id: '170', value: '江门市'}, {pro_code: '44', id: '279', value: '揭阳市'}, {
    pro_code: '44',
    id: '335',
    value: '梅州市'
  }, {pro_code: '44', id: '188', value: '清远市'}, {pro_code: '44', id: '102', value: '汕头市'}, {
    pro_code: '44',
    id: '93',
    value: '汕尾市'
  }, {pro_code: '44', id: '321', value: '韶关市'}, {pro_code: '44', id: '117', value: '云浮市'}, {
    pro_code: '44',
    id: '278',
    value: '肇庆市'
  }, {pro_code: '44', id: '330', value: '中山市'}, {pro_code: '44', id: '68', value: '珠海市'}, {
    pro_code: '23',
    id: '145',
    value: '哈尔滨市'
  }, {pro_code: '23', id: '226', value: '齐齐哈尔市'}, {
    pro_code: '23',
    id: '235',
    value: '黑河市'
  }, {pro_code: '23', id: '288', value: '大庆市'}, {pro_code: '23', id: '49', value: '伊春市'}, {
    pro_code: '23',
    id: '48',
    value: '鹤岗市'
  }, {pro_code: '23', id: '316', value: '佳木斯市'}, {
    pro_code: '23',
    id: '144',
    value: '双鸭山市'
  }, {pro_code: '23', id: '133', value: '七台河市'}, {pro_code: '23', id: '83', value: '鸡西市'}, {
    pro_code: '23',
    id: '192',
    value: '牡丹江市'
  }, {pro_code: '23', id: '270', value: '绥化市'}, {
    pro_code: '23',
    id: '96',
    value: '大兴安岭地区'
  }, {pro_code: '15', id: '95', value: '呼伦贝尔市'}, {pro_code: '34', id: '180', value: '合肥市'}, {
    pro_code: '34',
    id: '307',
    value: '宿州市'
  }, {pro_code: '34', id: '181', value: '淮北市'}, {pro_code: '34', id: '126', value: '阜阳市'}, {
    pro_code: '34',
    id: '306',
    value: '亳州市'
  }, {pro_code: '34', id: '123', value: '蚌埠市'}, {pro_code: '34', id: '296', value: '淮南市'}, {
    pro_code: '34',
    id: '298',
    value: '滁州市'
  }, {pro_code: '34', id: '333', value: '马鞍山市'}, {pro_code: '34', id: '244', value: '芜湖市'}, {
    pro_code: '34',
    id: '26',
    value: '铜陵市'
  }, {pro_code: '34', id: '30', value: '安庆市'}, {pro_code: '34', id: '91', value: '黄山市'}, {
    pro_code: '34',
    id: '136',
    value: '六安市'
  }, {pro_code: '34', id: '27', value: '池州市'}, {pro_code: '34', id: '28', value: '宣城市'}, {
    pro_code: '46',
    id: '50',
    value: '海口市'
  }, {pro_code: '46', id: '177', value: '儋州市'}, {pro_code: '46', id: '1', value: '三亚市'}, {
    pro_code: '44',
    id: '285',
    value: '阳江市'
  }, {pro_code: '44', id: '22', value: '茂名市'}, {pro_code: '44', id: '167', value: '湛江市'}, {
    pro_code: '33',
    id: '23',
    value: '杭州市'
  }, {pro_code: '33', id: '116', value: '湖州市'}, {pro_code: '33', id: '286', value: '嘉兴市'}, {
    pro_code: '33',
    id: '174',
    value: '衢州市'
  }, {pro_code: '33', id: '35', value: '金华市'}, {pro_code: '37', id: '148', value: '济宁市'}, {
    pro_code: '37',
    id: '80',
    value: '菏泽市'
  }, {pro_code: '37', id: '272', value: '枣庄市'}, {pro_code: '37', id: '339', value: '临沂市'}, {
    pro_code: '37',
    id: '249',
    value: '济南市'
  }, {pro_code: '37', id: '84', value: '淄博市'}, {pro_code: '37', id: '7', value: '德州市'}, {
    pro_code: '37',
    id: '195',
    value: '泰安市'
  }, {pro_code: '37', id: '196', value: '滨州市'}, {pro_code: '37', id: '78', value: '东营市'}, {
    pro_code: '37',
    id: '34',
    value: '莱芜'
  }, {pro_code: '37', id: '246', value: '聊城市'}, {pro_code: '21', id: '247', value: '朝阳市'}, {
    pro_code: '21',
    id: '79',
    value: '阜新市'
  }, {pro_code: '21', id: '173', value: '盘锦市'}, {pro_code: '21', id: '36', value: '锦州市'}, {
    pro_code: '21',
    id: '81',
    value: '葫芦岛市'
  }, {pro_code: '15', id: '8', value: '赤峰市'}, {pro_code: '53', id: '248', value: '昆明市'}, {
    pro_code: '53',
    id: '312',
    value: '曲靖市'
  }, {pro_code: '53', id: '67', value: '玉溪市'}, {pro_code: '53', id: '328', value: '保山市'}, {
    pro_code: '53',
    id: '44',
    value: '丽江市'
  }, {pro_code: '53', id: '345', value: '普洱市'}, {pro_code: '53', id: '223', value: '临沧市'}, {
    pro_code: '53',
    id: '313',
    value: '德宏傣族景颇族自治州'
  }, {pro_code: '53', id: '258', value: '怒江傈僳族自治州'}, {
    pro_code: '53',
    id: '344',
    value: '迪庆藏族自治州'
  }, {pro_code: '53', id: '160', value: '大理白族自治州'}, {
    pro_code: '53',
    id: '161',
    value: '楚雄彝族自治州'
  }, {pro_code: '53', id: '108', value: '红河哈尼族彝族自治州'}, {
    pro_code: '53',
    id: '166',
    value: '文山壮族苗族自治州'
  }, {pro_code: '53', id: '20', value: '西双版纳傣族自治州'}, {
    pro_code: '51',
    id: '51',
    value: '凉山彝族自治州'
  }, {pro_code: '51', id: '24', value: '攀枝花市'}, {pro_code: '62', id: '164', value: '兰州市'}, {
    pro_code: '62',
    id: '151',
    value: '嘉峪关市'
  }, {pro_code: '62', id: '152', value: '金昌市'}, {pro_code: '62', id: '119', value: '白银市'}, {
    pro_code: '62',
    id: '218',
    value: '天水市'
  }, {pro_code: '62', id: '158', value: '武威市'}, {pro_code: '62', id: '237', value: '酒泉市'}, {
    pro_code: '62',
    id: '103',
    value: '张掖市'
  }, {pro_code: '62', id: '154', value: '平凉市'}, {pro_code: '62', id: '104', value: '定西市'}, {
    pro_code: '62',
    id: '52',
    value: '陇南市'
  }, {pro_code: '62', id: '149', value: '临夏回族自治州'}, {
    pro_code: '62',
    id: '105',
    value: '甘南藏族自治州'
  }, {pro_code: '15', id: '197', value: '阿拉善盟'}, {pro_code: '33', id: '322', value: '宁波市'}, {
    pro_code: '33',
    id: '257',
    value: '绍兴市'
  }, {pro_code: '33', id: '273', value: '台州市'}, {pro_code: '33', id: '208', value: '温州市'}, {
    pro_code: '33',
    id: '106',
    value: '舟山市'
  }, {pro_code: '33', id: '107', value: '丽水市'}, {pro_code: '36', id: '283', value: '吉安市'}, {
    pro_code: '36',
    id: '175',
    value: '南昌市'
  }, {pro_code: '36', id: '82', value: '萍乡市'}, {pro_code: '36', id: '41', value: '赣州市'}, {
    pro_code: '36',
    id: '216',
    value: '上饶市'
  }, {pro_code: '36', id: '90', value: '景德镇市'}, {pro_code: '36', id: '219', value: '抚州市'}, {
    pro_code: '36',
    id: '135',
    value: '九江市'
  }, {pro_code: '36', id: '185', value: '新余市'}, {pro_code: '36', id: '184', value: '宜春市'}, {
    pro_code: '36',
    id: '89',
    value: '鹰潭市'
  }, {pro_code: '15', id: '323', value: '呼和浩特市'}, {
    pro_code: '15',
    id: '129',
    value: '包头市'
  }, {pro_code: '15', id: '245', value: '鄂尔多斯市'}, {
    pro_code: '15',
    id: '211',
    value: '锡林郭勒盟'
  }, {pro_code: '15', id: '64', value: '乌兰察布市'}, {
    pro_code: '15',
    id: '14',
    value: '巴彦淖尔市'
  }, {pro_code: '45', id: '302', value: '百色市'}, {pro_code: '45', id: '37', value: '北海市'}, {
    pro_code: '45',
    id: '127',
    value: '玉林市'
  }, {pro_code: '45', id: '214', value: '防城港市'}, {pro_code: '45', id: '215', value: '贵港市'}, {
    pro_code: '45',
    id: '100',
    value: '桂林市'
  }, {pro_code: '45', id: '200', value: '来宾市'}, {pro_code: '45', id: '12', value: '河池市'}, {
    pro_code: '45',
    id: '199',
    value: '贺州市'
  }, {pro_code: '45', id: '13', value: '柳州市'}, {pro_code: '45', id: '341', value: '南宁市'}, {
    pro_code: '45',
    id: '187',
    value: '崇左市'
  }, {pro_code: '45', id: '134', value: '钦州市'}, {pro_code: '45', id: '88', value: '梧州市'}, {
    pro_code: '37',
    id: '336',
    value: '青岛市'
  }, {pro_code: '37', id: '295', value: '潍坊市'}, {pro_code: '37', id: '178', value: '日照市'}, {
    pro_code: '35',
    id: '179',
    value: '福州市'
  }, {pro_code: '35', id: '86', value: '宁德市'}, {pro_code: '35', id: '256', value: '莆田市'}, {
    pro_code: '35',
    id: '287',
    value: '三明市'
  }, {pro_code: '35', id: '163', value: '南平市'}, {pro_code: '31', id: '240', value: '上海市'}, {
    pro_code: '13',
    id: '241',
    value: '石家庄市'
  }, {pro_code: '13', id: '172', value: '保定市'}, {pro_code: '13', id: '32', value: '衡水市'}, {
    pro_code: '13',
    id: '122',
    value: '邢台市'
  }, {pro_code: '13', id: '334', value: '邯郸市'}, {pro_code: '21', id: '274', value: '沈阳市'}, {
    pro_code: '21',
    id: '182',
    value: '铁岭市'
  }, {pro_code: '21', id: '76', value: '抚顺市'}, {pro_code: '21', id: '132', value: '本溪市'}, {
    pro_code: '21',
    id: '212',
    value: '辽阳市'
  }, {pro_code: '21', id: '206', value: '鞍山市'}, {pro_code: '15', id: '332', value: '通辽市'}, {
    pro_code: '44',
    id: '290',
    value: '深圳市'
  }, {pro_code: '12', id: '291', value: '天津市'}, {pro_code: '13', id: '284', value: '廊坊市'}, {
    pro_code: '13',
    id: '165',
    value: '沧州市'
  }, {pro_code: '13', id: '118', value: '唐山市'}, {pro_code: '13', id: '4', value: '秦皇岛市'}, {
    pro_code: '14',
    id: '242',
    value: '吕梁市'
  }, {pro_code: '14', id: '16', value: '太原市'}, {pro_code: '14', id: '222', value: '大同市'}, {
    pro_code: '14',
    id: '310',
    value: '朔州市'
  }, {pro_code: '14', id: '43', value: '阳泉市'}, {pro_code: '14', id: '311', value: '长治市'}, {
    pro_code: '14',
    id: '277',
    value: '晋城市'
  }, {pro_code: '14', id: '99', value: '忻州市'}, {pro_code: '14', id: '202', value: '晋中市'}, {
    pro_code: '14',
    id: '236',
    value: '临汾市'
  }, {pro_code: '14', id: '54', value: '运城市'}, {pro_code: '42', id: '234', value: '武汉市'}, {
    pro_code: '42',
    id: '29',
    value: '荆门市'
  }, {pro_code: '42', id: '121', value: '孝感市'}, {pro_code: '42', id: '168', value: '黄冈市'}, {
    pro_code: '42',
    id: '171',
    value: '鄂州市'
  }, {pro_code: '42', id: '75', value: '黄石市'}, {pro_code: '42', id: '232', value: '咸宁市'}, {
    pro_code: '42',
    id: '191',
    value: '荆州市'
  }, {pro_code: '42', id: '207', value: '宜昌市'}, {pro_code: '42', id: '297', value: '随州市'}, {
    pro_code: '42',
    id: '77',
    value: '仙桃市'
  }, {pro_code: '42', id: '299', value: '天门市'}, {pro_code: '42', id: '42', value: '潜江市'}, {
    pro_code: '42',
    id: '262',
    value: '恩施土家族苗族自治州'
  }, {pro_code: '32', id: '342', value: '无锡市'}, {pro_code: '32', id: '130', value: '常州市'}, {
    pro_code: '32',
    id: '227',
    value: '苏州市'
  }, {pro_code: '32', id: '217', value: '南通市'}, {pro_code: '42', id: '189', value: '十堰市'}, {
    pro_code: '42',
    id: '183',
    value: '襄阳市'
  }, {pro_code: '42', id: '255', value: '神农架林区'}, {
    pro_code: '65',
    id: '228',
    value: '乌鲁木齐市'
  }, {pro_code: '65', id: '186', value: '克拉玛依市'}, {
    pro_code: '65',
    id: '155',
    value: '石河子市'
  }, {pro_code: '65', id: '238', value: '阿拉尔市'}, {
    pro_code: '65',
    id: '317',
    value: '图木舒克市'
  }, {pro_code: '65', id: '190', value: '五家渠市'}, {
    pro_code: '65',
    id: '317',
    value: '喀什地区'
  }, {pro_code: '65', id: '238', value: '阿克苏地区'}, {
    pro_code: '65',
    id: '65',
    value: '和田地区'
  }, {pro_code: '65', id: '66', value: '吐鲁番市'}, {pro_code: '65', id: '239', value: '哈密市'}, {
    pro_code: '65',
    id: '280',
    value: '克孜勒苏柯尔克孜自治州'
  }, {pro_code: '65', id: '281', value: '博尔塔拉蒙古自治州'}, {
    pro_code: '65',
    id: '190',
    value: '昌吉回族自治州'
  }, {pro_code: '65', id: '229', value: '巴音郭楞蒙古自治州'}, {
    pro_code: '65',
    id: '87',
    value: '伊犁哈萨克自治州'
  }, {pro_code: '65', id: '15', value: '塔城地区'}, {
    pro_code: '65',
    id: '155',
    value: '阿勒泰地区'
  }, {pro_code: '35', id: '203', value: '厦门市'}, {pro_code: '35', id: '276', value: '泉州市'}, {
    pro_code: '35',
    id: '220',
    value: '漳州市'
  }, {pro_code: '35', id: '221', value: '龙岩市'}, {pro_code: '63', id: '264', value: '西宁市'}, {
    pro_code: '63',
    id: '303',
    value: '海东市'
  }, {pro_code: '63', id: '213', value: '海北藏族自治州'}, {
    pro_code: '63',
    id: '97',
    value: '海南藏族自治州'
  }, {pro_code: '63', id: '304', value: '黄南藏族自治州'}, {
    pro_code: '63',
    id: '305',
    value: '果洛藏族自治州'
  }, {pro_code: '63', id: '340', value: '玉树藏族自治州'}, {
    pro_code: '63',
    id: '125',
    value: '海西蒙古族藏族自治州'
  }, {pro_code: '54', id: '120', value: '拉萨市'}, {pro_code: '54', id: '265', value: '那曲地区'}, {
    pro_code: '54',
    id: '2',
    value: '昌都市'
  }, {pro_code: '54', id: '343', value: '林芝市'}, {pro_code: '54', id: '140', value: '山南市'}, {
    pro_code: '54',
    id: '98',
    value: '日喀则市'
  }, {pro_code: '54', id: '53', value: '阿里地区'}, {pro_code: '32', id: '139', value: '徐州市'}, {
    pro_code: '32',
    id: '251',
    value: '连云港市'
  }, {pro_code: '32', id: '308', value: '淮安市'}, {pro_code: '32', id: '9', value: '宿迁市'}, {
    pro_code: '32',
    id: '309',
    value: '盐城市'
  }, {pro_code: '64', id: '254', value: '银川市'}, {pro_code: '64', id: '73', value: '石嘴山市'}, {
    pro_code: '64',
    id: '72',
    value: '吴忠市'
  }, {pro_code: '64', id: '292', value: '中卫市'}, {pro_code: '64', id: '324', value: '固原市'}, {
    pro_code: '15',
    id: '11',
    value: '乌海市'
  }, {pro_code: '61', id: '109', value: '榆林市'}, {pro_code: '37', id: '198', value: '烟台市'}, {
    pro_code: '37',
    id: '10',
    value: '威海市'
  }, {pro_code: '41', id: '110', value: '郑州市'}, {pro_code: '41', id: '176', value: '驻马店市'}, {
    pro_code: '41',
    id: '85',
    value: '三门峡市'
  }, {pro_code: '41', id: '266', value: '洛阳市'}, {pro_code: '41', id: '162', value: '焦作市'}, {
    pro_code: '41',
    id: '230',
    value: '新乡市'
  }, {pro_code: '41', id: '115', value: '鹤壁市'}, {pro_code: '41', id: '318', value: '安阳市'}, {
    pro_code: '41',
    id: '259',
    value: '濮阳市'
  }, {pro_code: '41', id: '267', value: '开封市'}, {pro_code: '41', id: '319', value: '商丘市'}, {
    pro_code: '41',
    id: '38',
    value: '许昌市'
  }, {pro_code: '41', id: '25', value: '漯河市'}, {pro_code: '41', id: '331', value: '平顶山市'}, {
    pro_code: '41',
    id: '5',
    value: '南阳市'
  }, {pro_code: '41', id: '268', value: '信阳市'}, {pro_code: '41', id: '289', value: '周口市'}, {
    pro_code: '41',
    id: '162',
    value: '济源市'
  }, {pro_code: '21', id: '45', value: '丹东市'}, {pro_code: '21', id: '314', value: '大连市'}, {
    pro_code: '21',
    id: '46',
    value: '营口市'
  }, {pro_code: '62', id: '225', value: '庆阳市'}, {pro_code: '61', id: '169', value: '安康市'}, {
    pro_code: '61',
    id: '260',
    value: '延安市'
  }, {pro_code: '61', id: '71', value: '西安市'}, {pro_code: '61', id: '329', value: '渭南市'}, {
    pro_code: '61',
    id: '70',
    value: '宝鸡市'
  }, {pro_code: '61', id: '320', value: '咸阳市'}, {pro_code: '61', id: '243', value: '汉中市'}, {
    pro_code: '61',
    id: '21',
    value: '商洛市'
  }, {pro_code: '61', id: '31', value: '铜川市'}, {pro_code: '32', id: '210', value: '南京市'}, {
    pro_code: '32',
    id: '131',
    value: '泰州市'
  }, {pro_code: '32', id: '74', value: '扬州市'}, {pro_code: '32', id: '101', value: '镇江市'}, {
    pro_code: '65',
    id: '47',
    value: '双河市'
  }, {pro_code: '65', id: '315', value: '铁门关市'}, {pro_code: '46', id: '138', value: '三沙'}, {
    pro_code: '65',
    id: '346',
    value: '北屯市'
  }, {pro_code: '65', id: '224', value: '可克达拉市'}, {
    pro_code: '46',
    id: '138',
    value: '三沙市'
  }, {pro_code: '65', id: '347', value: '昆玉市'}, {pro_code: '13', id: '157', value: '承德市'}, {
    pro_code: '13',
    id: '156',
    value: '张家口市'
  }, {pro_code: '11', id: '338', value: '北京市'}];

const area = [{admin_code: '510105', city_code: '233', id: '05', value: '青羊区'}, {
  admin_code: '510104',
  city_code: '233',
  id: '04',
  value: '锦江区'
}, {admin_code: '510106', city_code: '233', id: '06', value: '金牛区'}, {
  admin_code: '510107',
  city_code: '233',
  id: '07',
  value: '武侯区'
}, {admin_code: '510108', city_code: '233', id: '08', value: '成华区'}, {
  admin_code: '510112',
  city_code: '233',
  id: '12',
  value: '龙泉驿区'
}, {admin_code: '510113', city_code: '233', id: '13', value: '青白江区'}, {
  admin_code: '510114',
  city_code: '233',
  id: '14',
  value: '新都区'
}, {admin_code: '510115', city_code: '233', id: '15', value: '温江区'}, {
  admin_code: '510184',
  city_code: '233',
  id: '84',
  value: '崇州市'
}, {admin_code: '510183', city_code: '233', id: '83', value: '邛崃市'}, {
  admin_code: '510181',
  city_code: '233',
  id: '81',
  value: '都江堰市'
}, {admin_code: '510182', city_code: '233', id: '82', value: '彭州市'}, {
  admin_code: '510121',
  city_code: '233',
  id: '21',
  value: '金堂县'
}, {admin_code: '510116', city_code: '233', id: '16', value: '双流区'}, {
  admin_code: '510117',
  city_code: '233',
  id: '17',
  value: '郫都区'
}, {admin_code: '510129', city_code: '233', id: '29', value: '大邑县'}, {
  admin_code: '510131',
  city_code: '233',
  id: '31',
  value: '蒲江县'
}, {admin_code: '510132', city_code: '233', id: '32', value: '新津县'}, {
  admin_code: '510800',
  city_code: '155',
  id: '00',
  value: '广元市'
}, {admin_code: '510802', city_code: '143', id: '02', value: '利州区'}, {
  admin_code: '510811',
  city_code: '143',
  id: '11',
  value: '昭化区'
}, {admin_code: '510812', city_code: '143', id: '12', value: '朝天区'}, {
  admin_code: '510821',
  city_code: '143',
  id: '21',
  value: '旺苍县'
}, {admin_code: '510822', city_code: '143', id: '22', value: '青川县'}, {
  admin_code: '510823',
  city_code: '143',
  id: '23',
  value: '剑阁县'
}, {admin_code: '510824', city_code: '143', id: '24', value: '苍溪县'}, {
  admin_code: '510703',
  city_code: '33',
  id: '03',
  value: '涪城区'
}, {admin_code: '510704', city_code: '33', id: '04', value: '游仙区'}, {
  admin_code: '510781',
  city_code: '33',
  id: '81',
  value: '江油市'
}, {admin_code: '510722', city_code: '33', id: '22', value: '三台县'}, {
  admin_code: '510723',
  city_code: '33',
  id: '23',
  value: '盐亭县'
}, {admin_code: '510705', city_code: '33', id: '05', value: '安州区'}, {
  admin_code: '510725',
  city_code: '33',
  id: '25',
  value: '梓潼县'
}, {admin_code: '510726', city_code: '33', id: '26', value: '北川羌族自治县'}, {
  admin_code: '510727',
  city_code: '33',
  id: '27',
  value: '平武县'
}, {admin_code: '510681', city_code: '337', id: '81', value: '广汉市'}, {
  admin_code: '510626',
  city_code: '337',
  id: '26',
  value: '罗江县'
}, {admin_code: '510623', city_code: '337', id: '23', value: '中江县'}, {
  admin_code: '510603',
  city_code: '337',
  id: '03',
  value: '旌阳区'
}, {admin_code: '510682', city_code: '337', id: '82', value: '什邡市'}, {
  admin_code: '510683',
  city_code: '337',
  id: '83',
  value: '绵竹市'
}, {admin_code: '513335', city_code: '193', id: '35', value: '巴塘县'}, {
  admin_code: '511300',
  city_code: '73',
  id: '00',
  value: '南充市'
}, {admin_code: '511302', city_code: '69', id: '02', value: '顺庆区'}, {
  admin_code: '511303',
  city_code: '69',
  id: '03',
  value: '高坪区'
}, {admin_code: '511304', city_code: '69', id: '04', value: '嘉陵区'}, {
  admin_code: '511381',
  city_code: '69',
  id: '81',
  value: '阆中市'
}, {admin_code: '511321', city_code: '69', id: '21', value: '南部县'}, {
  admin_code: '511322',
  city_code: '69',
  id: '22',
  value: '营山县'
}, {admin_code: '511323', city_code: '69', id: '23', value: '蓬安县'}, {
  admin_code: '511324',
  city_code: '69',
  id: '24',
  value: '仪陇县'
}, {admin_code: '511325', city_code: '69', id: '25', value: '西充县'}, {
  admin_code: '510904',
  city_code: '153',
  id: '04',
  value: '安居区'
}, {admin_code: '510903', city_code: '153', id: '03', value: '船山区'}, {
  admin_code: '510921',
  city_code: '153',
  id: '21',
  value: '蓬溪县'
}, {admin_code: '510922', city_code: '153', id: '22', value: '射洪县'}, {
  admin_code: '510923',
  city_code: '153',
  id: '23',
  value: '大英县'
}, {admin_code: '511000', city_code: '110', id: '00', value: '内江市'}, {
  admin_code: '511002',
  city_code: '111',
  id: '02',
  value: '市中区'
}, {admin_code: '511011', city_code: '111', id: '11', value: '东兴区'}, {
  admin_code: '511024',
  city_code: '111',
  id: '24',
  value: '威远县'
}, {admin_code: '511025', city_code: '111', id: '25', value: '资中县'}, {
  admin_code: '511083',
  city_code: '111',
  id: '83',
  value: '隆昌市'
}, {admin_code: '511100', city_code: '272', id: '00', value: '乐山市'}, {
  admin_code: '511102',
  city_code: '271',
  id: '02',
  value: '市中区'
}, {admin_code: '511111', city_code: '271', id: '11', value: '沙湾区'}, {
  admin_code: '511112',
  city_code: '271',
  id: '12',
  value: '五通桥区'
}, {admin_code: '511113', city_code: '271', id: '13', value: '金口河区'}, {
  admin_code: '511181',
  city_code: '271',
  id: '81',
  value: '峨眉山市'
}, {admin_code: '511123', city_code: '271', id: '23', value: '犍为县'}, {
  admin_code: '511124',
  city_code: '271',
  id: '24',
  value: '井研县'
}, {admin_code: '511126', city_code: '271', id: '26', value: '夹江县'}, {
  admin_code: '511129',
  city_code: '271',
  id: '29',
  value: '沐川县'
}, {admin_code: '511132', city_code: '271', id: '32', value: '峨边彝族自治县'}, {
  admin_code: '511133',
  city_code: '271',
  id: '33',
  value: '马边彝族自治县'
}, {admin_code: '510300', city_code: '130', id: '00', value: '自贡市'}, {
  admin_code: '510304',
  city_code: '128',
  id: '04',
  value: '大安区'
}, {admin_code: '510303', city_code: '128', id: '03', value: '贡井区'}, {
  admin_code: '510302',
  city_code: '128',
  id: '02',
  value: '自流井区'
}, {admin_code: '510311', city_code: '128', id: '11', value: '沿滩区'}, {
  admin_code: '510321',
  city_code: '128',
  id: '21',
  value: '荣县'
}, {admin_code: '510322', city_code: '128', id: '22', value: '富顺县'}, {
  admin_code: '511900',
  city_code: '61',
  id: '00',
  value: '巴中市'
}, {admin_code: '511902', city_code: '63', id: '02', value: '巴州区'}, {
  admin_code: '511921',
  city_code: '63',
  id: '21',
  value: '通江县'
}, {admin_code: '511922', city_code: '63', id: '22', value: '南江县'}, {
  admin_code: '511923',
  city_code: '63',
  id: '23',
  value: '平昌县'
}, {admin_code: '512000', city_code: '325', id: '00', value: '资阳市'}, {
  admin_code: '512002',
  city_code: '325',
  id: '02',
  value: '雁江区'
}, {admin_code: '510185', city_code: '233', id: '85', value: '简阳市'}, {
  admin_code: '512022',
  city_code: '325',
  id: '22',
  value: '乐至县'
}, {admin_code: '512021', city_code: '325', id: '21', value: '安岳县'}, {
  admin_code: '511400',
  city_code: '203',
  id: '00',
  value: '眉山市'
}, {admin_code: '511402', city_code: '201', id: '02', value: '东坡区'}, {
  admin_code: '511421',
  city_code: '201',
  id: '21',
  value: '仁寿县'
}, {admin_code: '511403', city_code: '201', id: '03', value: '彭山区'}, {
  admin_code: '511423',
  city_code: '201',
  id: '23',
  value: '洪雅县'
}, {admin_code: '511424', city_code: '201', id: '24', value: '丹棱县'}, {
  admin_code: '511425',
  city_code: '201',
  id: '25',
  value: '青神县'
}, {admin_code: '511800', city_code: '269', id: '00', value: '雅安市'}, {
  admin_code: '511802',
  city_code: '269',
  id: '02',
  value: '雨城区'
}, {admin_code: '511803', city_code: '269', id: '03', value: '名山区'}, {
  admin_code: '511822',
  city_code: '269',
  id: '22',
  value: '荥经县'
}, {admin_code: '511823', city_code: '269', id: '23', value: '汉源县'}, {
  admin_code: '511824',
  city_code: '269',
  id: '24',
  value: '石棉县'
}, {admin_code: '511825', city_code: '269', id: '25', value: '天全县'}, {
  admin_code: '511826',
  city_code: '269',
  id: '26',
  value: '芦山县'
}, {admin_code: '511827', city_code: '269', id: '27', value: '宝兴县'}, {
  admin_code: '513201',
  city_code: '61',
  id: '01',
  value: '马尔康市'
}, {admin_code: '513221', city_code: '61', id: '21', value: '汶川县'}, {
  admin_code: '513222',
  city_code: '61',
  id: '22',
  value: '理县'
}, {admin_code: '513223', city_code: '61', id: '23', value: '茂县'}, {
  admin_code: '513224',
  city_code: '61',
  id: '24',
  value: '松潘县'
}, {admin_code: '513225', city_code: '61', id: '25', value: '九寨沟县'}, {
  admin_code: '513226',
  city_code: '61',
  id: '26',
  value: '金川县'
}, {admin_code: '513227', city_code: '61', id: '27', value: '小金县'}, {
  admin_code: '513228',
  city_code: '61',
  id: '28',
  value: '黑水县'
}, {admin_code: '513230', city_code: '61', id: '30', value: '壤塘县'}, {
  admin_code: '513231',
  city_code: '61',
  id: '31',
  value: '阿坝县'
}, {admin_code: '513232', city_code: '61', id: '32', value: '若尔盖县'}, {
  admin_code: '513233',
  city_code: '61',
  id: '33',
  value: '红原县'
}, {admin_code: '513301', city_code: '193', id: '01', value: '康定市'}, {
  admin_code: '513322',
  city_code: '193',
  id: '22',
  value: '泸定县'
}, {admin_code: '513323', city_code: '193', id: '23', value: '丹巴县'}, {
  admin_code: '513324',
  city_code: '193',
  id: '24',
  value: '九龙县'
}, {admin_code: '513325', city_code: '193', id: '25', value: '雅江县'}, {
  admin_code: '513326',
  city_code: '193',
  id: '26',
  value: '道孚县'
}, {admin_code: '513327', city_code: '193', id: '27', value: '炉霍县'}, {
  admin_code: '513328',
  city_code: '193',
  id: '28',
  value: '甘孜县'
}, {admin_code: '513329', city_code: '193', id: '29', value: '新龙县'}, {
  admin_code: '513330',
  city_code: '193',
  id: '30',
  value: '德格县'
}, {admin_code: '513332', city_code: '193', id: '32', value: '石渠县'}, {
  admin_code: '513333',
  city_code: '193',
  id: '33',
  value: '色达县'
}, {admin_code: '513334', city_code: '193', id: '34', value: '理塘县'}, {
  admin_code: '513331',
  city_code: '193',
  id: '31',
  value: '白玉县'
}, {admin_code: '513336', city_code: '193', id: '36', value: '乡城县'}, {
  admin_code: '513337',
  city_code: '193',
  id: '37',
  value: '稻城县'
}, {admin_code: '513338', city_code: '193', id: '38', value: '得荣县'}, {
  admin_code: '220104',
  city_code: '327',
  id: '04',
  value: '朝阳区'
}, {admin_code: '220102', city_code: '327', id: '02', value: '南关区'}, {
  admin_code: '220103',
  city_code: '327',
  id: '03',
  value: '宽城区'
}, {admin_code: '220105', city_code: '327', id: '05', value: '二道区'}, {
  admin_code: '220106',
  city_code: '327',
  id: '06',
  value: '绿园区'
}, {admin_code: '220112', city_code: '327', id: '12', value: '双阳区'}, {
  admin_code: '220183',
  city_code: '327',
  id: '83',
  value: '德惠市'
}, {admin_code: '220113', city_code: '327', id: '13', value: '九台区'}, {
  admin_code: '220182',
  city_code: '327',
  id: '82',
  value: '榆树市'
}, {admin_code: '220122', city_code: '327', id: '22', value: '农安县'}, {
  admin_code: '220802',
  city_code: '18',
  id: '02',
  value: '洮北区'
}, {admin_code: '220882', city_code: '18', id: '82', value: '大安市'}, {
  admin_code: '220881',
  city_code: '18',
  id: '81',
  value: '洮南市'
}, {admin_code: '220821', city_code: '18', id: '21', value: '镇赉县'}, {
  admin_code: '220822',
  city_code: '18',
  id: '22',
  value: '通榆县'
}, {admin_code: '220702', city_code: '282', id: '02', value: '宁江区'}, {
  admin_code: '220781',
  city_code: '282',
  id: '81',
  value: '扶余市'
}, {admin_code: '220722', city_code: '282', id: '22', value: '长岭县'}, {
  admin_code: '220723',
  city_code: '282',
  id: '23',
  value: '乾安县'
}, {admin_code: '220721', city_code: '282', id: '21', value: '前郭尔罗斯蒙古族自治县'}, {
  admin_code: '220204',
  city_code: '60',
  id: '04',
  value: '船营区'
}, {admin_code: '220203', city_code: '60', id: '03', value: '龙潭区'}, {
  admin_code: '220202',
  city_code: '60',
  id: '02',
  value: '昌邑区'
}, {admin_code: '220211', city_code: '60', id: '11', value: '丰满区'}, {
  admin_code: '220284',
  city_code: '60',
  id: '84',
  value: '磐石市'
}, {admin_code: '220281', city_code: '60', id: '81', value: '蛟河市'}, {
  admin_code: '220282',
  city_code: '60',
  id: '82',
  value: '桦甸市'
}, {admin_code: '220283', city_code: '60', id: '83', value: '舒兰市'}, {
  admin_code: '220221',
  city_code: '60',
  id: '21',
  value: '永吉县'
}, {admin_code: '220302', city_code: '194', id: '02', value: '铁西区'}, {
  admin_code: '220303',
  city_code: '194',
  id: '03',
  value: '铁东区'
}, {admin_code: '220382', city_code: '194', id: '82', value: '双辽市'}, {
  admin_code: '220381',
  city_code: '194',
  id: '81',
  value: '公主岭市'
}, {admin_code: '220322', city_code: '194', id: '22', value: '梨树县'}, {
  admin_code: '220323',
  city_code: '194',
  id: '23',
  value: '伊通满族自治县'
}, {admin_code: '220402', city_code: '17', id: '02', value: '龙山区'}, {
  admin_code: '220403',
  city_code: '17',
  id: '03',
  value: '西安区'
}, {admin_code: '220421', city_code: '17', id: '21', value: '东丰县'}, {
  admin_code: '220422',
  city_code: '17',
  id: '22',
  value: '东辽县'
}, {admin_code: '220502', city_code: '141', id: '02', value: '东昌区'}, {
  admin_code: '220503',
  city_code: '141',
  id: '03',
  value: '二道江区'
}, {admin_code: '220581', city_code: '141', id: '81', value: '梅河口市'}, {
  admin_code: '220582',
  city_code: '141',
  id: '82',
  value: '集安市'
}, {admin_code: '220521', city_code: '141', id: '21', value: '通化县'}, {
  admin_code: '220523',
  city_code: '141',
  id: '23',
  value: '辉南县'
}, {admin_code: '220524', city_code: '141', id: '24', value: '柳河县'}, {
  admin_code: '220602',
  city_code: '142',
  id: '02',
  value: '浑江区'
}, {admin_code: '220681', city_code: '142', id: '81', value: '临江市'}, {
  admin_code: '220605',
  city_code: '142',
  id: '05',
  value: '江源区'
}, {admin_code: '220621', city_code: '142', id: '21', value: '抚松县'}, {
  admin_code: '220622',
  city_code: '142',
  id: '22',
  value: '靖宇县'
}, {admin_code: '220623', city_code: '142', id: '23', value: '长白朝鲜族自治县'}, {
  admin_code: '222401',
  city_code: '6',
  id: '01',
  value: '延吉市'
}, {admin_code: '222402', city_code: '6', id: '02', value: '图们市'}, {
  admin_code: '222403',
  city_code: '6',
  id: '03',
  value: '敦化市'
}, {admin_code: '222404', city_code: '6', id: '04', value: '珲春市'}, {
  admin_code: '222405',
  city_code: '6',
  id: '05',
  value: '龙井市'
}, {admin_code: '222406', city_code: '6', id: '06', value: '和龙市'}, {
  admin_code: '222424',
  city_code: '6',
  id: '24',
  value: '汪清县'
}, {admin_code: '222426', city_code: '6', id: '26', value: '安图县'}, {
  admin_code: '152201',
  city_code: '55',
  id: '01',
  value: '乌兰浩特市'
}, {admin_code: '152202', city_code: '55', id: '02', value: '阿尔山市'}, {
  admin_code: '152224',
  city_code: '55',
  id: '24',
  value: '突泉县'
}, {admin_code: '152221', city_code: '55', id: '21', value: '科尔沁右翼前旗'}, {
  admin_code: '152222',
  city_code: '55',
  id: '22',
  value: '科尔沁右翼中旗'
}, {admin_code: '152223', city_code: '55', id: '23', value: '扎赉特旗'}, {
  admin_code: '500103',
  city_code: '3',
  id: '03',
  value: '渝中区'
}, {admin_code: '500105', city_code: '3', id: '05', value: '江北区'}, {
  admin_code: '500106',
  city_code: '3',
  id: '06',
  value: '沙坪坝区'
}, {admin_code: '500107', city_code: '3', id: '07', value: '九龙坡区'}, {
  admin_code: '500108',
  city_code: '3',
  id: '08',
  value: '南岸区'
}, {admin_code: '500104', city_code: '3', id: '04', value: '大渡口区'}, {
  admin_code: '500109',
  city_code: '3',
  id: '09',
  value: '北碚区'
}, {admin_code: '500112', city_code: '3', id: '12', value: '渝北区'}, {
  admin_code: '500115',
  city_code: '3',
  id: '15',
  value: '长寿区'
}, {admin_code: '500113', city_code: '3', id: '13', value: '巴南区'}, {
  admin_code: '500117',
  city_code: '3',
  id: '17',
  value: '合川区'
}, {admin_code: '500118', city_code: '3', id: '18', value: '永川区'}, {
  admin_code: '500116',
  city_code: '3',
  id: '16',
  value: '江津区'
}, {admin_code: '500153', city_code: '3', id: '53', value: '荣昌区'}, {
  admin_code: '500151',
  city_code: '3',
  id: '51',
  value: '铜梁区'
}, {admin_code: '500152', city_code: '3', id: '52', value: '潼南区'}, {
  admin_code: '500120',
  city_code: '3',
  id: '20',
  value: '璧山区'
}, {admin_code: '500101', city_code: '3', id: '01', value: '万州区'}, {
  admin_code: '500233',
  city_code: '348',
  id: '33',
  value: '忠县'
}, {admin_code: '500235', city_code: '348', id: '35', value: '云阳县'}, {
  admin_code: '500236',
  city_code: '348',
  id: '36',
  value: '奉节县'
}, {admin_code: '500237', city_code: '348', id: '37', value: '巫山县'}, {
  admin_code: '500228',
  city_code: '3',
  id: '28',
  value: '梁平县'
}, {admin_code: '500154', city_code: '3', id: '54', value: '开州区'}, {
  admin_code: '500238',
  city_code: '348',
  id: '38',
  value: '巫溪县'
}, {admin_code: '500229', city_code: '348', id: '29', value: '城口县'}, {
  admin_code: '500102',
  city_code: '3',
  id: '02',
  value: '涪陵区'
}, {admin_code: '500230', city_code: '348', id: '30', value: '丰都县'}, {
  admin_code: '500156',
  city_code: '3',
  id: '56',
  value: '武隆区'
}, {admin_code: '500231', city_code: '348', id: '31', value: '垫江县'}, {
  admin_code: '500119',
  city_code: '3',
  id: '19',
  value: '南川区'
}, {admin_code: '500240', city_code: '348', id: '40', value: '石柱土家族自治县'}, {
  admin_code: '500243',
  city_code: '348',
  id: '43',
  value: '彭水苗族土家族自治县'
}, {admin_code: '500114', city_code: '3', id: '14', value: '黔江区'}, {
  admin_code: '500242',
  city_code: '348',
  id: '42',
  value: '酉阳土家族苗族自治县'
}, {admin_code: '500241', city_code: '348', id: '41', value: '秀山土家族苗族自治县'}, {
  admin_code: '511702',
  city_code: '250',
  id: '02',
  value: '通川区'
}, {admin_code: '511703', city_code: '250', id: '03', value: '达川区'}, {
  admin_code: '511724',
  city_code: '250',
  id: '24',
  value: '大竹县'
}, {admin_code: '511725', city_code: '250', id: '25', value: '渠县'}, {
  admin_code: '511722',
  city_code: '250',
  id: '22',
  value: '宣汉县'
}, {admin_code: '511723', city_code: '250', id: '23', value: '开江县'}, {
  admin_code: '511781',
  city_code: '250',
  id: '81',
  value: '万源市'
}, {admin_code: '511602', city_code: '40', id: '02', value: '广安区'}, {
  admin_code: '511621',
  city_code: '40',
  id: '21',
  value: '岳池县'
}, {admin_code: '511622', city_code: '40', id: '22', value: '武胜县'}, {
  admin_code: '511623',
  city_code: '40',
  id: '23',
  value: '邻水县'
}, {admin_code: '511681', city_code: '40', id: '81', value: '华蓥市'}, {
  admin_code: '511502',
  city_code: '300',
  id: '02',
  value: '翠屏区'
}, {admin_code: '511503', city_code: '300', id: '03', value: '南溪区'}, {
  admin_code: '511523',
  city_code: '300',
  id: '23',
  value: '江安县'
}, {admin_code: '511524', city_code: '300', id: '24', value: '长宁县'}, {
  admin_code: '511528',
  city_code: '300',
  id: '28',
  value: '兴文县'
}, {admin_code: '511526', city_code: '300', id: '26', value: '珙县'}, {
  admin_code: '511521',
  city_code: '300',
  id: '21',
  value: '宜宾县'
}, {admin_code: '511525', city_code: '300', id: '25', value: '高县'}, {
  admin_code: '511527',
  city_code: '300',
  id: '27',
  value: '筠连县'
}, {admin_code: '511529', city_code: '300', id: '29', value: '屏山县'}, {
  admin_code: '510504',
  city_code: '124',
  id: '04',
  value: '龙马潭区'
}, {admin_code: '510502', city_code: '124', id: '02', value: '江阳区'}, {
  admin_code: '510521',
  city_code: '124',
  id: '21',
  value: '泸县'
}, {admin_code: '510522', city_code: '124', id: '22', value: '合江县'}, {
  admin_code: '510503',
  city_code: '124',
  id: '03',
  value: '纳溪区'
}, {admin_code: '510524', city_code: '124', id: '24', value: '叙永县'}, {
  admin_code: '510525',
  city_code: '124',
  id: '25',
  value: '古蔺县'
}, {admin_code: '530681', city_code: '112', id: '30', value: '水富市'}, {
  admin_code: '430104',
  city_code: '113',
  id: '04',
  value: '岳麓区'
}, {admin_code: '430102', city_code: '113', id: '02', value: '芙蓉区'}, {
  admin_code: '430103',
  city_code: '113',
  id: '03',
  value: '天心区'
}, {admin_code: '430105', city_code: '113', id: '05', value: '开福区'}, {
  admin_code: '430111',
  city_code: '113',
  id: '11',
  value: '雨花区'
}, {admin_code: '430181', city_code: '113', id: '81', value: '浏阳市'}, {
  admin_code: '430121',
  city_code: '113',
  id: '21',
  value: '长沙县'
}, {admin_code: '430112', city_code: '113', id: '12', value: '望城区'}, {
  admin_code: '430182',
  city_code: '113',
  id: '82',
  value: '宁乡市'
}, {admin_code: '430802', city_code: '39', id: '02', value: '永定区'}, {
  admin_code: '430821',
  city_code: '39',
  id: '21',
  value: '慈利县'
}, {admin_code: '430822', city_code: '39', id: '22', value: '桑植县'}, {
  admin_code: '430702',
  city_code: '261',
  id: '02',
  value: '武陵区'
}, {admin_code: '430781', city_code: '261', id: '81', value: '津市市'}, {
  admin_code: '430722',
  city_code: '261',
  id: '22',
  value: '汉寿县'
}, {admin_code: '430723', city_code: '261', id: '23', value: '澧县'}, {
  admin_code: '430724',
  city_code: '261',
  id: '24',
  value: '临澧县'
}, {admin_code: '430725', city_code: '261', id: '25', value: '桃源县'}, {
  admin_code: '430726',
  city_code: '261',
  id: '26',
  value: '石门县'
}, {admin_code: '430903', city_code: '252', id: '03', value: '赫山区'}, {
  admin_code: '430981',
  city_code: '252',
  id: '81',
  value: '沅江市'
}, {admin_code: '430921', city_code: '252', id: '21', value: '南县'}, {
  admin_code: '430922',
  city_code: '252',
  id: '22',
  value: '桃江县'
}, {admin_code: '430923', city_code: '252', id: '23', value: '安化县'}, {
  admin_code: '430602',
  city_code: '263',
  id: '02',
  value: '岳阳楼区'
}, {admin_code: '430681', city_code: '263', id: '81', value: '汨罗市'}, {
  admin_code: '430682',
  city_code: '263',
  id: '82',
  value: '临湘市'
}, {admin_code: '430621', city_code: '263', id: '21', value: '岳阳县'}, {
  admin_code: '430623',
  city_code: '263',
  id: '23',
  value: '华容县'
}, {admin_code: '430624', city_code: '263', id: '24', value: '湘阴县'}, {
  admin_code: '430626',
  city_code: '263',
  id: '26',
  value: '平江县'
}, {admin_code: '430202', city_code: '231', id: '02', value: '荷塘区'}, {
  admin_code: '430281',
  city_code: '231',
  id: '81',
  value: '醴陵市'
}, {admin_code: '430212', city_code: '231', id: '21', value: '渌口区'}, {
  admin_code: '430223',
  city_code: '231',
  id: '23',
  value: '攸县'
}, {admin_code: '430224', city_code: '231', id: '24', value: '茶陵县'}, {
  admin_code: '430225',
  city_code: '231',
  id: '25',
  value: '炎陵县'
}, {admin_code: '430302', city_code: '150', id: '02', value: '雨湖区'}, {
  admin_code: '430381',
  city_code: '150',
  id: '81',
  value: '湘乡市'
}, {admin_code: '430382', city_code: '150', id: '82', value: '韶山市'}, {
  admin_code: '430321',
  city_code: '150',
  id: '21',
  value: '湘潭县'
}, {admin_code: '430406', city_code: '326', id: '06', value: '雁峰区'}, {
  admin_code: '430482',
  city_code: '326',
  id: '82',
  value: '常宁市'
}, {admin_code: '430481', city_code: '326', id: '81', value: '耒阳市'}, {
  admin_code: '430421',
  city_code: '326',
  id: '21',
  value: '衡阳县'
}, {admin_code: '430422', city_code: '326', id: '22', value: '衡南县'}, {
  admin_code: '430423',
  city_code: '326',
  id: '23',
  value: '衡山县'
}, {admin_code: '430424', city_code: '326', id: '24', value: '衡东县'}, {
  admin_code: '430426',
  city_code: '326',
  id: '26',
  value: '祁东县'
}, {admin_code: '431002', city_code: '209', id: '02', value: '北湖区'}, {
  admin_code: '431081',
  city_code: '209',
  id: '81',
  value: '资兴市'
}, {admin_code: '431021', city_code: '209', id: '21', value: '桂阳县'}, {
  admin_code: '431023',
  city_code: '209',
  id: '23',
  value: '永兴县'
}, {admin_code: '431022', city_code: '209', id: '22', value: '宜章县'}, {
  admin_code: '431024',
  city_code: '209',
  id: '24',
  value: '嘉禾县'
}, {admin_code: '431025', city_code: '209', id: '25', value: '临武县'}, {
  admin_code: '431026',
  city_code: '209',
  id: '26',
  value: '汝城县'
}, {admin_code: '431027', city_code: '209', id: '27', value: '桂东县'}, {
  admin_code: '431028',
  city_code: '209',
  id: '28',
  value: '安仁县'
}, {admin_code: '431102', city_code: '159', id: '02', value: '零陵区'}, {
  admin_code: '431122',
  city_code: '159',
  id: '22',
  value: '东安县'
}, {admin_code: '431124', city_code: '159', id: '24', value: '道县'}, {
  admin_code: '431126',
  city_code: '159',
  id: '26',
  value: '宁远县'
}, {admin_code: '431125', city_code: '159', id: '25', value: '江永县'}, {
  admin_code: '431127',
  city_code: '159',
  id: '27',
  value: '蓝山县'
}, {admin_code: '431128', city_code: '159', id: '28', value: '新田县'}, {
  admin_code: '431123',
  city_code: '159',
  id: '23',
  value: '双牌县'
}, {admin_code: '431121', city_code: '159', id: '21', value: '祁阳县'}, {
  admin_code: '431129',
  city_code: '159',
  id: '29',
  value: '江华瑶族自治县'
}, {admin_code: '430503', city_code: '275', id: '03', value: '大祥区'}, {
  admin_code: '430581',
  city_code: '275',
  id: '81',
  value: '武冈市'
}, {admin_code: '430521', city_code: '275', id: '21', value: '邵东县'}, {
  admin_code: '430523',
  city_code: '275',
  id: '23',
  value: '邵阳县'
}, {admin_code: '430522', city_code: '275', id: '22', value: '新邵县'}, {
  admin_code: '430524',
  city_code: '275',
  id: '24',
  value: '隆回县'
}, {admin_code: '430525', city_code: '275', id: '25', value: '洞口县'}, {
  admin_code: '430527',
  city_code: '275',
  id: '27',
  value: '绥宁县'
}, {admin_code: '430528', city_code: '275', id: '28', value: '新宁县'}, {
  admin_code: '430529',
  city_code: '275',
  id: '29',
  value: '城步苗族自治县'
}, {admin_code: '431202', city_code: '62', id: '02', value: '鹤城区'}, {
  admin_code: '431281',
  city_code: '62',
  id: '81',
  value: '洪江市'
}, {admin_code: '431222', city_code: '62', id: '22', value: '沅陵县'}, {
  admin_code: '431223',
  city_code: '62',
  id: '23',
  value: '辰溪县'
}, {admin_code: '431224', city_code: '62', id: '24', value: '溆浦县'}, {
  admin_code: '431221',
  city_code: '62',
  id: '21',
  value: '中方县'
}, {admin_code: '431225', city_code: '62', id: '25', value: '会同县'}, {
  admin_code: '431226',
  city_code: '62',
  id: '26',
  value: '麻阳苗族自治县'
}, {admin_code: '431227', city_code: '62', id: '27', value: '新晃侗族自治县'}, {
  admin_code: '431228',
  city_code: '62',
  id: '28',
  value: '芷江侗族自治县'
}, {admin_code: '431229', city_code: '62', id: '29', value: '靖州苗族侗族自治县'}, {
  admin_code: '431230',
  city_code: '62',
  id: '30',
  value: '通道侗族自治县'
}, {admin_code: '431302', city_code: '147', id: '02', value: '娄星区'}, {
  admin_code: '431381',
  city_code: '147',
  id: '81',
  value: '冷水江市'
}, {admin_code: '431382', city_code: '147', id: '82', value: '涟源市'}, {
  admin_code: '431321',
  city_code: '147',
  id: '21',
  value: '双峰县'
}, {admin_code: '431322', city_code: '147', id: '22', value: '新化县'}, {
  admin_code: '433101',
  city_code: '204',
  id: '01',
  value: '吉首市'
}, {admin_code: '433122', city_code: '204', id: '22', value: '泸溪县'}, {
  admin_code: '433123',
  city_code: '204',
  id: '23',
  value: '凤凰县'
}, {admin_code: '433124', city_code: '204', id: '24', value: '花垣县'}, {
  admin_code: '433125',
  city_code: '204',
  id: '25',
  value: '保靖县'
}, {admin_code: '433126', city_code: '204', id: '26', value: '古丈县'}, {
  admin_code: '433127',
  city_code: '204',
  id: '27',
  value: '永顺县'
}, {admin_code: '433130', city_code: '204', id: '30', value: '龙山县'}, {
  admin_code: '520102',
  city_code: '59',
  id: '02',
  value: '南明区'
}, {admin_code: '520103', city_code: '59', id: '03', value: '云岩区'}, {
  admin_code: '520111',
  city_code: '59',
  id: '11',
  value: '花溪区'
}, {admin_code: '520112', city_code: '59', id: '12', value: '乌当区'}, {
  admin_code: '520113',
  city_code: '59',
  id: '13',
  value: '白云区'
}, {admin_code: '520115', city_code: '59', id: '15', value: '观山湖区'}, {
  admin_code: '520181',
  city_code: '59',
  id: '81',
  value: '清镇市'
}, {admin_code: '520121', city_code: '59', id: '21', value: '开阳县'}, {
  admin_code: '520123',
  city_code: '59',
  id: '23',
  value: '修文县'
}, {admin_code: '520122', city_code: '59', id: '22', value: '息烽县'}, {
  admin_code: '520201',
  city_code: '94',
  id: '01',
  value: '钟山区'
}, {admin_code: '520281', city_code: '94', id: '81', value: '盘州市'}, {
  admin_code: '520203',
  city_code: '94',
  id: '03',
  value: '六枝特区'
}, {admin_code: '520221', city_code: '94', id: '21', value: '水城县'}, {
  admin_code: '520302',
  city_code: '58',
  id: '02',
  value: '红花岗区'
}, {admin_code: '520381', city_code: '58', id: '81', value: '赤水市'}, {
  admin_code: '520382',
  city_code: '58',
  id: '82',
  value: '仁怀市'
}, {admin_code: '520304', city_code: '58', id: '04', value: '播州区'}, {
  admin_code: '520322',
  city_code: '58',
  id: '22',
  value: '桐梓县'
}, {admin_code: '520323', city_code: '58', id: '23', value: '绥阳县'}, {
  admin_code: '520324',
  city_code: '58',
  id: '24',
  value: '正安县'
}, {admin_code: '520327', city_code: '58', id: '27', value: '凤冈县'}, {
  admin_code: '520328',
  city_code: '58',
  id: '28',
  value: '湄潭县'
}, {admin_code: '520329', city_code: '58', id: '29', value: '余庆县'}, {
  admin_code: '520330',
  city_code: '58',
  id: '30',
  value: '习水县'
}, {admin_code: '520325', city_code: '58', id: '25', value: '道真仡佬族苗族自治县'}, {
  admin_code: '520326',
  city_code: '58',
  id: '26',
  value: '务川仡佬族苗族自治县'
}, {admin_code: '520400', city_code: '252', id: '00', value: '安顺市'}, {
  admin_code: '520403',
  city_code: '253',
  id: '03',
  value: '平坝区'
}, {admin_code: '520422', city_code: '253', id: '22', value: '普定县'}, {
  admin_code: '520424',
  city_code: '253',
  id: '24',
  value: '关岭布依族苗族自治县'
}, {admin_code: '520423', city_code: '253', id: '23', value: '镇宁布依族苗族自治县'}, {
  admin_code: '520425',
  city_code: '253',
  id: '25',
  value: '紫云苗族布依族自治县'
}, {admin_code: '520502', city_code: '205', id: '02', value: '七星关区'}, {
  admin_code: '520521',
  city_code: '205',
  id: '21',
  value: '大方县'
}, {admin_code: '520522', city_code: '205', id: '22', value: '黔西县'}, {
  admin_code: '520523',
  city_code: '205',
  id: '23',
  value: '金沙县'
}, {admin_code: '520524', city_code: '205', id: '24', value: '织金县'}, {
  admin_code: '520525',
  city_code: '205',
  id: '25',
  value: '纳雍县'
}, {admin_code: '520527', city_code: '205', id: '27', value: '赫章县'}, {
  admin_code: '520526',
  city_code: '205',
  id: '26',
  value: '威宁彝族回族苗族自治县'
}, {admin_code: '520602', city_code: '57', id: '02', value: '碧江区'}, {
  admin_code: '520621',
  city_code: '57',
  id: '21',
  value: '江口县'
}, {admin_code: '520623', city_code: '57', id: '23', value: '石阡县'}, {
  admin_code: '520624',
  city_code: '57',
  id: '24',
  value: '思南县'
}, {admin_code: '520626', city_code: '57', id: '26', value: '德江县'}, {
  admin_code: '520622',
  city_code: '57',
  id: '22',
  value: '玉屏侗族自治县'
}, {admin_code: '520625', city_code: '57', id: '25', value: '印江土家族苗族自治县'}, {
  admin_code: '520627',
  city_code: '57',
  id: '27',
  value: '沿河土家族自治县'
}, {admin_code: '520628', city_code: '57', id: '28', value: '松桃苗族自治县'}, {
  admin_code: '520603',
  city_code: '57',
  id: '03',
  value: '万山区'
}, {admin_code: '522601', city_code: '56', id: '01', value: '凯里市'}, {
  admin_code: '522622',
  city_code: '56',
  id: '22',
  value: '黄平县'
}, {admin_code: '522623', city_code: '56', id: '23', value: '施秉县'}, {
  admin_code: '522624',
  city_code: '56',
  id: '24',
  value: '三穗县'
}, {admin_code: '522625', city_code: '56', id: '25', value: '镇远县'}, {
  admin_code: '522626',
  city_code: '56',
  id: '26',
  value: '岑巩县'
}, {admin_code: '522627', city_code: '56', id: '27', value: '天柱县'}, {
  admin_code: '522628',
  city_code: '56',
  id: '28',
  value: '锦屏县'
}, {admin_code: '522629', city_code: '56', id: '29', value: '剑河县'}, {
  admin_code: '522630',
  city_code: '56',
  id: '30',
  value: '台江县'
}, {admin_code: '522631', city_code: '56', id: '31', value: '黎平县'}, {
  admin_code: '522632',
  city_code: '56',
  id: '32',
  value: '榕江县'
}, {admin_code: '522633', city_code: '56', id: '33', value: '从江县'}, {
  admin_code: '522634',
  city_code: '56',
  id: '34',
  value: '雷山县'
}, {admin_code: '522635', city_code: '56', id: '35', value: '麻江县'}, {
  admin_code: '522636',
  city_code: '56',
  id: '36',
  value: '丹寨县'
}, {admin_code: '522701', city_code: '146', id: '01', value: '都匀市'}, {
  admin_code: '522702',
  city_code: '146',
  id: '02',
  value: '福泉市'
}, {admin_code: '522722', city_code: '146', id: '22', value: '荔波县'}, {
  admin_code: '522723',
  city_code: '146',
  id: '23',
  value: '贵定县'
}, {admin_code: '522725', city_code: '146', id: '25', value: '瓮安县'}, {
  admin_code: '522726',
  city_code: '146',
  id: '26',
  value: '独山县'
}, {admin_code: '522727', city_code: '146', id: '27', value: '平塘县'}, {
  admin_code: '522728',
  city_code: '146',
  id: '28',
  value: '罗甸县'
}, {admin_code: '522729', city_code: '146', id: '29', value: '长顺县'}, {
  admin_code: '522730',
  city_code: '146',
  id: '30',
  value: '龙里县'
}, {admin_code: '522731', city_code: '146', id: '31', value: '惠水县'}, {
  admin_code: '522732',
  city_code: '146',
  id: '32',
  value: '三都水族自治县'
}, {admin_code: '522301', city_code: '114', id: '01', value: '兴义市'}, {
  admin_code: '522302',
  city_code: '114',
  id: '22',
  value: '兴仁市'
}, {admin_code: '522323', city_code: '114', id: '23', value: '普安县'}, {
  admin_code: '522324',
  city_code: '114',
  id: '24',
  value: '晴隆县'
}, {admin_code: '522325', city_code: '114', id: '25', value: '贞丰县'}, {
  admin_code: '522326',
  city_code: '114',
  id: '26',
  value: '望谟县'
}, {admin_code: '522327', city_code: '114', id: '27', value: '册亨县'}, {
  admin_code: '522328',
  city_code: '114',
  id: '28',
  value: '安龙县'
}, {admin_code: '530627', city_code: '112', id: '27', value: '镇雄县'}, {
  admin_code: '445103',
  city_code: '19',
  id: '03',
  value: '潮安区'
}, {admin_code: '445122', city_code: '19', id: '22', value: '饶平县'}, {
  admin_code: '445102',
  city_code: '19',
  id: '02',
  value: '湘桥区'
}, {admin_code: '441900', city_code: '92', id: '00', value: '东莞市'}, {
  admin_code: '440604',
  city_code: '137',
  id: '04',
  value: '禅城区'
}, {admin_code: '440608', city_code: '137', id: '08', value: '高明区'}, {
  admin_code: '440605',
  city_code: '137',
  id: '05',
  value: '南海区'
}, {admin_code: '440607', city_code: '137', id: '07', value: '三水区'}, {
  admin_code: '440606',
  city_code: '137',
  id: '06',
  value: '顺德区'
}, {admin_code: '440111', city_code: '294', id: '11', value: '白云区'}, {
  admin_code: '440117',
  city_code: '294',
  id: '17',
  value: '从化区'
}, {admin_code: '440113', city_code: '294', id: '13', value: '番禺区'}, {
  admin_code: '440100',
  city_code: '299',
  id: '00',
  value: '广州市'
}, {admin_code: '440105', city_code: '294', id: '05', value: '海珠区'}, {
  admin_code: '440114',
  city_code: '294',
  id: '14',
  value: '花都区'
}, {admin_code: '440112', city_code: '294', id: '12', value: '黄埔区'}, {
  admin_code: '440103',
  city_code: '294',
  id: '03',
  value: '荔湾区'
}, {admin_code: '440106', city_code: '294', id: '06', value: '天河区'}, {
  admin_code: '440104',
  city_code: '294',
  id: '04',
  value: '越秀区'
}, {admin_code: '440118', city_code: '294', id: '18', value: '增城区'}, {
  admin_code: '441625',
  city_code: '301',
  id: '25',
  value: '东源县'
}, {admin_code: '441624', city_code: '301', id: '24', value: '和平县'}, {
  admin_code: '441623',
  city_code: '301',
  id: '23',
  value: '连平县'
}, {admin_code: '441622', city_code: '301', id: '22', value: '龙川县'}, {
  admin_code: '441602',
  city_code: '301',
  id: '02',
  value: '源城区'
}, {admin_code: '441621', city_code: '301', id: '21', value: '紫金县'}, {
  admin_code: '441322',
  city_code: '293',
  id: '22',
  value: '博罗县'
}, {admin_code: '441302', city_code: '293', id: '02', value: '惠城区'}, {
  admin_code: '441323',
  city_code: '293',
  id: '23',
  value: '惠东县'
}, {admin_code: '441303', city_code: '293', id: '03', value: '惠阳区'}, {
  admin_code: '441324',
  city_code: '293',
  id: '24',
  value: '龙门县'
}, {admin_code: '440785', city_code: '170', id: '85', value: '恩平市'}, {
  admin_code: '440784',
  city_code: '170',
  id: '84',
  value: '鹤山市'
}, {admin_code: '440704', city_code: '170', id: '04', value: '江海区'}, {
  admin_code: '440783',
  city_code: '170',
  id: '83',
  value: '开平市'
}, {admin_code: '440703', city_code: '170', id: '03', value: '蓬江区'}, {
  admin_code: '440781',
  city_code: '170',
  id: '81',
  value: '台山市'
}, {admin_code: '440705', city_code: '170', id: '05', value: '新会区'}, {
  admin_code: '445224',
  city_code: '279',
  id: '24',
  value: '惠来县'
}, {admin_code: '445203', city_code: '279', id: '03', value: '揭东区'}, {
  admin_code: '445222',
  city_code: '279',
  id: '22',
  value: '揭西县'
}, {admin_code: '445200', city_code: '281', id: '00', value: '揭阳市'}, {
  admin_code: '445202',
  city_code: '279',
  id: '02',
  value: '榕城区'
}, {admin_code: '441422', city_code: '335', id: '22', value: '大埔县'}, {
  admin_code: '441423',
  city_code: '335',
  id: '23',
  value: '丰顺县'
}, {admin_code: '441427', city_code: '335', id: '27', value: '蕉岭县'}, {
  admin_code: '441402',
  city_code: '335',
  id: '02',
  value: '梅江区'
}, {admin_code: '441403', city_code: '335', id: '03', value: '梅县区'}, {
  admin_code: '441426',
  city_code: '335',
  id: '26',
  value: '平远县'
}, {admin_code: '441424', city_code: '335', id: '24', value: '五华县'}, {
  admin_code: '441481',
  city_code: '335',
  id: '81',
  value: '兴宁市'
}, {admin_code: '441821', city_code: '188', id: '21', value: '佛冈县'}, {
  admin_code: '441826',
  city_code: '188',
  id: '26',
  value: '连南瑶族自治县'
}, {admin_code: '441825', city_code: '188', id: '25', value: '连山壮族瑶族自治县'}, {
  admin_code: '441882',
  city_code: '188',
  id: '82',
  value: '连州市'
}, {admin_code: '441802', city_code: '188', id: '02', value: '清城区'}, {
  admin_code: '441803',
  city_code: '188',
  id: '03',
  value: '清新区'
}, {admin_code: '441823', city_code: '188', id: '23', value: '阳山县'}, {
  admin_code: '441881',
  city_code: '188',
  id: '81',
  value: '英德市'
}, {admin_code: '440513', city_code: '102', id: '13', value: '潮阳区'}, {
  admin_code: '440515',
  city_code: '102',
  id: '15',
  value: '澄海区'
}, {admin_code: '440512', city_code: '102', id: '12', value: '濠江区'}, {
  admin_code: '440511',
  city_code: '102',
  id: '11',
  value: '金平区'
}, {admin_code: '440507', city_code: '102', id: '07', value: '龙湖区'}, {
  admin_code: '440523',
  city_code: '102',
  id: '23',
  value: '南澳县'
}, {admin_code: '440514', city_code: '102', id: '14', value: '潮南区'}, {
  admin_code: '441502',
  city_code: '93',
  id: '02',
  value: '城区'
}, {admin_code: '441521', city_code: '93', id: '21', value: '海丰县'}, {
  admin_code: '441581',
  city_code: '93',
  id: '81',
  value: '陆丰市'
}, {admin_code: '441523', city_code: '93', id: '23', value: '陆河县'}, {
  admin_code: '440281',
  city_code: '321',
  id: '81',
  value: '乐昌市'
}, {admin_code: '440282', city_code: '321', id: '82', value: '南雄市'}, {
  admin_code: '440205',
  city_code: '321',
  id: '05',
  value: '曲江区'
}, {admin_code: '440224', city_code: '321', id: '24', value: '仁化县'}, {
  admin_code: '440232',
  city_code: '321',
  id: '32',
  value: '乳源瑶族自治县'
}, {admin_code: '440203', city_code: '321', id: '03', value: '武江区'}, {
  admin_code: '440222',
  city_code: '321',
  id: '22',
  value: '始兴县'
}, {admin_code: '440229', city_code: '321', id: '29', value: '翁源县'}, {
  admin_code: '440233',
  city_code: '321',
  id: '33',
  value: '新丰县'
}, {admin_code: '445381', city_code: '117', id: '81', value: '罗定市'}, {
  admin_code: '445321',
  city_code: '117',
  id: '21',
  value: '新兴县'
}, {admin_code: '445322', city_code: '117', id: '22', value: '郁南县'}, {
  admin_code: '445303',
  city_code: '117',
  id: '03',
  value: '云安区'
}, {admin_code: '445302', city_code: '117', id: '02', value: '云城区'}, {
  admin_code: '441226',
  city_code: '278',
  id: '26',
  value: '德庆县'
}, {admin_code: '441225', city_code: '278', id: '25', value: '封开县'}, {
  admin_code: '441204',
  city_code: '278',
  id: '04',
  value: '高要区'
}, {admin_code: '441223', city_code: '278', id: '23', value: '广宁县'}, {
  admin_code: '441224',
  city_code: '278',
  id: '24',
  value: '怀集县'
}, {admin_code: '442000', city_code: '330', id: '00', value: '中山市'}, {
  admin_code: '440403',
  city_code: '68',
  id: '03',
  value: '斗门区'
}, {admin_code: '440404', city_code: '68', id: '04', value: '金湾区'}, {
  admin_code: '440402',
  city_code: '68',
  id: '02',
  value: '香洲区'
}, {admin_code: '230102', city_code: '145', id: '02', value: '道里区'}, {
  admin_code: '230103',
  city_code: '145',
  id: '03',
  value: '南岗区'
}, {admin_code: '230104', city_code: '145', id: '04', value: '道外区'}, {
  admin_code: '230109',
  city_code: '145',
  id: '09',
  value: '松北区'
}, {admin_code: '230110', city_code: '145', id: '10', value: '香坊区'}, {
  admin_code: '230108',
  city_code: '145',
  id: '08',
  value: '平房区'
}, {admin_code: '230113', city_code: '145', id: '13', value: '双城区'}, {
  admin_code: '230183',
  city_code: '145',
  id: '83',
  value: '尚志市'
}, {admin_code: '230184', city_code: '145', id: '84', value: '五常市'}, {
  admin_code: '230112',
  city_code: '145',
  id: '12',
  value: '阿城区'
}, {admin_code: '230111', city_code: '145', id: '11', value: '呼兰区'}, {
  admin_code: '230123',
  city_code: '145',
  id: '23',
  value: '依兰县'
}, {admin_code: '230124', city_code: '145', id: '24', value: '方正县'}, {
  admin_code: '230125',
  city_code: '145',
  id: '25',
  value: '宾县'
}, {admin_code: '230126', city_code: '145', id: '26', value: '巴彦县'}, {
  admin_code: '230127',
  city_code: '145',
  id: '27',
  value: '木兰县'
}, {admin_code: '230128', city_code: '145', id: '28', value: '通河县'}, {
  admin_code: '230129',
  city_code: '145',
  id: '29',
  value: '延寿县'
}, {admin_code: '230202', city_code: '226', id: '02', value: '龙沙区'}, {
  admin_code: '230281',
  city_code: '226',
  id: '81',
  value: '讷河市'
}, {admin_code: '230221', city_code: '226', id: '21', value: '龙江县'}, {
  admin_code: '230223',
  city_code: '226',
  id: '23',
  value: '依安县'
}, {admin_code: '230224', city_code: '226', id: '24', value: '泰来县'}, {
  admin_code: '230225',
  city_code: '226',
  id: '25',
  value: '甘南县'
}, {admin_code: '230227', city_code: '226', id: '27', value: '富裕县'}, {
  admin_code: '230229',
  city_code: '226',
  id: '29',
  value: '克山县'
}, {admin_code: '230230', city_code: '226', id: '30', value: '克东县'}, {
  admin_code: '230231',
  city_code: '226',
  id: '31',
  value: '拜泉县'
}, {admin_code: '231102', city_code: '235', id: '02', value: '爱辉区'}, {
  admin_code: '231181',
  city_code: '235',
  id: '81',
  value: '北安市'
}, {admin_code: '231182', city_code: '235', id: '82', value: '五大连池市'}, {
  admin_code: '231121',
  city_code: '235',
  id: '21',
  value: '嫩江县'
}, {admin_code: '231123', city_code: '235', id: '23', value: '逊克县'}, {
  admin_code: '231124',
  city_code: '235',
  id: '24',
  value: '孙吴县'
}, {admin_code: '230602', city_code: '288', id: '02', value: '萨尔图区'}, {
  admin_code: '230603',
  city_code: '288',
  id: '03',
  value: '龙凤区'
}, {admin_code: '230604', city_code: '288', id: '04', value: '让胡路区'}, {
  admin_code: '230606',
  city_code: '288',
  id: '06',
  value: '大同区'
}, {admin_code: '230605', city_code: '288', id: '05', value: '红岗区'}, {
  admin_code: '230621',
  city_code: '288',
  id: '21',
  value: '肇州县'
}, {admin_code: '230622', city_code: '288', id: '22', value: '肇源县'}, {
  admin_code: '230623',
  city_code: '288',
  id: '23',
  value: '林甸县'
}, {admin_code: '230624', city_code: '288', id: '24', value: '杜尔伯特蒙古族自治县'}, {
  admin_code: '230702',
  city_code: '49',
  id: '02',
  value: '伊春区'
}, {admin_code: '230703', city_code: '49', id: '03', value: '南岔区'}, {
  admin_code: '230704',
  city_code: '49',
  id: '04',
  value: '友好区'
}, {admin_code: '230705', city_code: '49', id: '05', value: '西林区'}, {
  admin_code: '230706',
  city_code: '49',
  id: '06',
  value: '翠峦区'
}, {admin_code: '230707', city_code: '49', id: '07', value: '新青区'}, {
  admin_code: '230708',
  city_code: '49',
  id: '08',
  value: '美溪区'
}, {admin_code: '230709', city_code: '49', id: '09', value: '金山屯区'}, {
  admin_code: '230710',
  city_code: '49',
  id: '10',
  value: '五营区'
}, {admin_code: '230711', city_code: '49', id: '11', value: '乌马河区'}, {
  admin_code: '230712',
  city_code: '49',
  id: '12',
  value: '汤旺河区'
}, {admin_code: '230713', city_code: '49', id: '13', value: '带岭区'}, {
  admin_code: '230714',
  city_code: '49',
  id: '14',
  value: '乌伊岭区'
}, {admin_code: '230715', city_code: '49', id: '15', value: '红星区'}, {
  admin_code: '230716',
  city_code: '49',
  id: '16',
  value: '上甘岭区'
}, {admin_code: '230781', city_code: '49', id: '81', value: '铁力市'}, {
  admin_code: '230722',
  city_code: '49',
  id: '22',
  value: '嘉荫县'
}, {admin_code: '230407', city_code: '48', id: '07', value: '兴山区'}, {
  admin_code: '230402',
  city_code: '48',
  id: '02',
  value: '向阳区'
}, {admin_code: '230403', city_code: '48', id: '03', value: '工农区'}, {
  admin_code: '230404',
  city_code: '48',
  id: '04',
  value: '南山区'
}, {admin_code: '230405', city_code: '48', id: '05', value: '兴安区'}, {
  admin_code: '230406',
  city_code: '48',
  id: '06',
  value: '东山区'
}, {admin_code: '230421', city_code: '48', id: '21', value: '萝北县'}, {
  admin_code: '230422',
  city_code: '48',
  id: '22',
  value: '绥滨县'
}, {admin_code: '230804', city_code: '316', id: '04', value: '前进区'}, {
  admin_code: '230803',
  city_code: '316',
  id: '03',
  value: '向阳区'
}, {admin_code: '230805', city_code: '316', id: '05', value: '东风区'}, {
  admin_code: '230811',
  city_code: '316',
  id: '11',
  value: '郊区'
}, {admin_code: '230881', city_code: '316', id: '81', value: '同江市'}, {
  admin_code: '230882',
  city_code: '316',
  id: '82',
  value: '富锦市'
}, {admin_code: '230822', city_code: '316', id: '22', value: '桦南县'}, {
  admin_code: '230826',
  city_code: '316',
  id: '26',
  value: '桦川县'
}, {admin_code: '230828', city_code: '316', id: '28', value: '汤原县'}, {
  admin_code: '230883',
  city_code: '316',
  id: '83',
  value: '抚远市'
}, {admin_code: '230502', city_code: '144', id: '02', value: '尖山区'}, {
  admin_code: '230503',
  city_code: '144',
  id: '03',
  value: '岭东区'
}, {admin_code: '230505', city_code: '144', id: '05', value: '四方台区'}, {
  admin_code: '230506',
  city_code: '144',
  id: '06',
  value: '宝山区'
}, {admin_code: '230521', city_code: '144', id: '21', value: '集贤县'}, {
  admin_code: '230522',
  city_code: '144',
  id: '22',
  value: '友谊县'
}, {admin_code: '230523', city_code: '144', id: '23', value: '宝清县'}, {
  admin_code: '230524',
  city_code: '144',
  id: '24',
  value: '饶河县'
}, {admin_code: '230903', city_code: '133', id: '03', value: '桃山区'}, {
  admin_code: '230902',
  city_code: '133',
  id: '02',
  value: '新兴区'
}, {admin_code: '230904', city_code: '133', id: '04', value: '茄子河区'}, {
  admin_code: '230921',
  city_code: '133',
  id: '21',
  value: '勃利县'
}, {admin_code: '230302', city_code: '83', id: '02', value: '鸡冠区'}, {
  admin_code: '230303',
  city_code: '83',
  id: '03',
  value: '恒山区'
}, {admin_code: '230304', city_code: '83', id: '04', value: '滴道区'}, {
  admin_code: '230305',
  city_code: '83',
  id: '05',
  value: '梨树区'
}, {admin_code: '230306', city_code: '83', id: '06', value: '城子河区'}, {
  admin_code: '230307',
  city_code: '83',
  id: '07',
  value: '麻山区'
}, {admin_code: '230381', city_code: '83', id: '81', value: '虎林市'}, {
  admin_code: '230382',
  city_code: '83',
  id: '82',
  value: '密山市'
}, {admin_code: '230321', city_code: '83', id: '21', value: '鸡东县'}, {
  admin_code: '231004',
  city_code: '192',
  id: '04',
  value: '爱民区'
}, {admin_code: '231002', city_code: '192', id: '02', value: '东安区'}, {
  admin_code: '231003',
  city_code: '192',
  id: '03',
  value: '阳明区'
}, {admin_code: '231005', city_code: '192', id: '05', value: '西安区'}, {
  admin_code: '231085',
  city_code: '192',
  id: '85',
  value: '穆棱市'
}, {admin_code: '231081', city_code: '192', id: '81', value: '绥芬河市'}, {
  admin_code: '231083',
  city_code: '192',
  id: '83',
  value: '海林市'
}, {admin_code: '231084', city_code: '192', id: '84', value: '宁安市'}, {
  admin_code: '231086',
  city_code: '192',
  id: '86',
  value: '东宁市'
}, {admin_code: '231025', city_code: '192', id: '25', value: '林口县'}, {
  admin_code: '231202',
  city_code: '270',
  id: '02',
  value: '北林区'
}, {admin_code: '231281', city_code: '270', id: '81', value: '安达市'}, {
  admin_code: '231282',
  city_code: '270',
  id: '82',
  value: '肇东市'
}, {admin_code: '231283', city_code: '270', id: '83', value: '海伦市'}, {
  admin_code: '231221',
  city_code: '270',
  id: '21',
  value: '望奎县'
}, {admin_code: '231222', city_code: '270', id: '22', value: '兰西县'}, {
  admin_code: '231223',
  city_code: '270',
  id: '23',
  value: '青冈县'
}, {admin_code: '231224', city_code: '270', id: '24', value: '庆安县'}, {
  admin_code: '231225',
  city_code: '270',
  id: '25',
  value: '明水县'
}, {admin_code: '231226', city_code: '270', id: '26', value: '绥棱县'}, {
  admin_code: '232721',
  city_code: '96',
  id: '21',
  value: '呼玛县'
}, {admin_code: '232722', city_code: '96', id: '22', value: '塔河县'}, {
  admin_code: '232701',
  city_code: '96',
  id: '23',
  value: '漠河市'
}, {admin_code: '150727', city_code: '95', id: '27', value: '新巴尔虎右旗'}, {
  admin_code: '150726',
  city_code: '95',
  id: '26',
  value: '新巴尔虎左旗'
}, {admin_code: '150725', city_code: '95', id: '25', value: '陈巴尔虎旗'}, {
  admin_code: '150723',
  city_code: '95',
  id: '23',
  value: '鄂伦春自治旗'
}, {admin_code: '150724', city_code: '95', id: '24', value: '鄂温克族自治旗'}, {
  admin_code: '150722',
  city_code: '95',
  id: '22',
  value: '莫力达瓦达斡尔族自治旗'
}, {admin_code: '340103', city_code: '180', id: '03', value: '庐阳区'}, {
  admin_code: '340102',
  city_code: '180',
  id: '02',
  value: '瑶海区'
}, {admin_code: '340104', city_code: '180', id: '04', value: '蜀山区'}, {
  admin_code: '340111',
  city_code: '180',
  id: '11',
  value: '包河区'
}, {admin_code: '340121', city_code: '180', id: '21', value: '长丰县'}, {
  admin_code: '340122',
  city_code: '180',
  id: '22',
  value: '肥东县'
}, {admin_code: '340123', city_code: '180', id: '23', value: '肥西县'}, {
  admin_code: '341302',
  city_code: '307',
  id: '02',
  value: '埇桥区'
}, {admin_code: '341321', city_code: '307', id: '21', value: '砀山县'}, {
  admin_code: '341322',
  city_code: '307',
  id: '22',
  value: '萧县'
}, {admin_code: '341323', city_code: '307', id: '23', value: '灵璧县'}, {
  admin_code: '341324',
  city_code: '307',
  id: '24',
  value: '泗县'
}, {admin_code: '340603', city_code: '181', id: '03', value: '相山区'}, {
  admin_code: '340602',
  city_code: '181',
  id: '02',
  value: '杜集区'
}, {admin_code: '340604', city_code: '181', id: '04', value: '烈山区'}, {
  admin_code: '340621',
  city_code: '181',
  id: '21',
  value: '濉溪县'
}, {admin_code: '341202', city_code: '126', id: '02', value: '颍州区'}, {
  admin_code: '341203',
  city_code: '126',
  id: '03',
  value: '颍东区'
}, {admin_code: '341204', city_code: '126', id: '04', value: '颍泉区'}, {
  admin_code: '341282',
  city_code: '126',
  id: '82',
  value: '界首市'
}, {admin_code: '341221', city_code: '126', id: '21', value: '临泉县'}, {
  admin_code: '341222',
  city_code: '126',
  id: '22',
  value: '太和县'
}, {admin_code: '341225', city_code: '126', id: '25', value: '阜南县'}, {
  admin_code: '341226',
  city_code: '126',
  id: '26',
  value: '颍上县'
}, {admin_code: '341602', city_code: '306', id: '02', value: '谯城区'}, {
  admin_code: '341621',
  city_code: '306',
  id: '21',
  value: '涡阳县'
}, {admin_code: '341622', city_code: '306', id: '22', value: '蒙城县'}, {
  admin_code: '341623',
  city_code: '306',
  id: '23',
  value: '利辛县'
}, {admin_code: '340303', city_code: '123', id: '03', value: '蚌山区'}, {
  admin_code: '340302',
  city_code: '123',
  id: '02',
  value: '龙子湖区'
}, {admin_code: '340304', city_code: '123', id: '04', value: '禹会区'}, {
  admin_code: '340311',
  city_code: '123',
  id: '11',
  value: '淮上区'
}, {admin_code: '340321', city_code: '123', id: '21', value: '怀远县'}, {
  admin_code: '340322',
  city_code: '123',
  id: '22',
  value: '五河县'
}, {admin_code: '340323', city_code: '123', id: '23', value: '固镇县'}, {
  admin_code: '340403',
  city_code: '296',
  id: '03',
  value: '田家庵区'
}, {admin_code: '340402', city_code: '296', id: '02', value: '大通区'}, {
  admin_code: '340404',
  city_code: '296',
  id: '04',
  value: '谢家集区'
}, {admin_code: '340405', city_code: '296', id: '05', value: '八公山区'}, {
  admin_code: '340406',
  city_code: '296',
  id: '06',
  value: '潘集区'
}, {admin_code: '340421', city_code: '296', id: '21', value: '凤台县'}, {
  admin_code: '341102',
  city_code: '298',
  id: '02',
  value: '琅琊区'
}, {admin_code: '341103', city_code: '298', id: '03', value: '南谯区'}, {
  admin_code: '341182',
  city_code: '298',
  id: '82',
  value: '明光市'
}, {admin_code: '341181', city_code: '298', id: '81', value: '天长市'}, {
  admin_code: '341122',
  city_code: '298',
  id: '22',
  value: '来安县'
}, {admin_code: '341124', city_code: '298', id: '24', value: '全椒县'}, {
  admin_code: '341125',
  city_code: '298',
  id: '25',
  value: '定远县'
}, {admin_code: '341126', city_code: '298', id: '26', value: '凤阳县'}, {
  admin_code: '340504',
  city_code: '333',
  id: '04',
  value: '雨山区'
}, {admin_code: '340503', city_code: '333', id: '03', value: '花山区'}, {
  admin_code: '340502',
  city_code: '333',
  id: '02',
  value: '金家庄区'
}, {admin_code: '340521', city_code: '333', id: '21', value: '当涂县'}, {
  admin_code: '340202',
  city_code: '244',
  id: '02',
  value: '镜湖区'
}, {admin_code: '340203', city_code: '244', id: '03', value: '弋江区'}, {
  admin_code: '340207',
  city_code: '244',
  id: '07',
  value: '鸠江区'
}, {admin_code: '340221', city_code: '244', id: '21', value: '芜湖县'}, {
  admin_code: '340222',
  city_code: '244',
  id: '22',
  value: '繁昌县'
}, {admin_code: '340223', city_code: '244', id: '23', value: '南陵县'}, {
  admin_code: '340705',
  city_code: '26',
  id: '05',
  value: '铜官区'
}, {admin_code: '340703', city_code: '26', id: '03', value: '狮子山区'}, {
  admin_code: '340711',
  city_code: '26',
  id: '11',
  value: '郊区'
}, {admin_code: '340706', city_code: '26', id: '06', value: '义安区'}, {
  admin_code: '340802',
  city_code: '30',
  id: '02',
  value: '迎江区'
}, {admin_code: '340803', city_code: '30', id: '03', value: '大观区'}, {
  admin_code: '340811',
  city_code: '30',
  id: '11',
  value: '宜秀区'
}, {admin_code: '340881', city_code: '30', id: '81', value: '桐城市'}, {
  admin_code: '340822',
  city_code: '30',
  id: '22',
  value: '怀宁县'
}, {admin_code: '340722', city_code: '26', id: '22', value: '枞阳县'}, {
  admin_code: '340882',
  city_code: '30',
  id: '24',
  value: '潜山市'
}, {admin_code: '340825', city_code: '30', id: '25', value: '太湖县'}, {
  admin_code: '340826',
  city_code: '30',
  id: '26',
  value: '宿松县'
}, {admin_code: '340827', city_code: '30', id: '27', value: '望江县'}, {
  admin_code: '340828',
  city_code: '30',
  id: '28',
  value: '岳西县'
}, {admin_code: '341002', city_code: '91', id: '02', value: '屯溪区'}, {
  admin_code: '341003',
  city_code: '91',
  id: '03',
  value: '黄山区'
}, {admin_code: '341004', city_code: '91', id: '04', value: '徽州区'}, {
  admin_code: '341021',
  city_code: '91',
  id: '21',
  value: '歙县'
}, {admin_code: '341022', city_code: '91', id: '22', value: '休宁县'}, {
  admin_code: '341023',
  city_code: '91',
  id: '23',
  value: '黟县'
}, {admin_code: '341024', city_code: '91', id: '24', value: '祁门县'}, {
  admin_code: '341502',
  city_code: '136',
  id: '02',
  value: '金安区'
}, {admin_code: '341503', city_code: '136', id: '03', value: '裕安区'}, {
  admin_code: '340422',
  city_code: '296',
  id: '22',
  value: '寿县'
}, {admin_code: '341522', city_code: '136', id: '22', value: '霍邱县'}, {
  admin_code: '341523',
  city_code: '136',
  id: '23',
  value: '舒城县'
}, {admin_code: '341524', city_code: '136', id: '24', value: '金寨县'}, {
  admin_code: '341525',
  city_code: '136',
  id: '25',
  value: '霍山县'
}, {admin_code: '340181', city_code: '180', id: '81', value: '巢湖市'}, {
  admin_code: '340124',
  city_code: '180',
  id: '24',
  value: '庐江县'
}, {admin_code: '340225', city_code: '244', id: '25', value: '无为县'}, {
  admin_code: '340522',
  city_code: '333',
  id: '22',
  value: '含山县'
}, {admin_code: '340523', city_code: '333', id: '23', value: '和县'}, {
  admin_code: '341702',
  city_code: '27',
  id: '02',
  value: '贵池区'
}, {admin_code: '341721', city_code: '27', id: '21', value: '东至县'}, {
  admin_code: '341722',
  city_code: '27',
  id: '22',
  value: '石台县'
}, {admin_code: '341723', city_code: '27', id: '23', value: '青阳县'}, {
  admin_code: '341802',
  city_code: '28',
  id: '02',
  value: '宣州区'
}, {admin_code: '341881', city_code: '28', id: '81', value: '宁国市'}, {
  admin_code: '341821',
  city_code: '28',
  id: '21',
  value: '郎溪县'
}, {admin_code: '341822', city_code: '28', id: '22', value: '广德县'}, {
  admin_code: '341823',
  city_code: '28',
  id: '23',
  value: '泾县'
}, {admin_code: '341825', city_code: '28', id: '25', value: '旌德县'}, {
  admin_code: '341824',
  city_code: '28',
  id: '24',
  value: '绩溪县'
}, {admin_code: '460106', city_code: '50', id: '32', value: '龙华区'}, {
  admin_code: '460105',
  city_code: '50',
  id: '31',
  value: '秀英区'
}, {admin_code: '460107', city_code: '50', id: '33', value: '琼山区'}, {
  admin_code: '460108',
  city_code: '50',
  id: '08',
  value: '美兰区'
}, {admin_code: '469005', city_code: '50', id: '05', value: '文昌市'}, {
  admin_code: '469002',
  city_code: '50',
  id: '02',
  value: '琼海市'
}, {admin_code: '469006', city_code: '50', id: '06', value: '万宁市'}, {
  admin_code: '469001',
  city_code: '50',
  id: '01',
  value: '五指山市'
}, {admin_code: '469007', city_code: '50', id: '07', value: '东方市'}, {
  admin_code: '460400',
  city_code: '177',
  id: '00',
  value: '儋州市'
}, {admin_code: '469024', city_code: '50', id: '24', value: '临高县'}, {
  admin_code: '469023',
  city_code: '50',
  id: '23',
  value: '澄迈县'
}, {admin_code: '469021', city_code: '50', id: '21', value: '定安县'}, {
  admin_code: '469022',
  city_code: '50',
  id: '22',
  value: '屯昌县'
}, {admin_code: '469026', city_code: '50', id: '26', value: '昌江黎族自治县'}, {
  admin_code: '469025',
  city_code: '50',
  id: '25',
  value: '白沙黎族自治县'
}, {admin_code: '469030', city_code: '50', id: '30', value: '琼中黎族苗族自治县'}, {
  admin_code: '469028',
  city_code: '50',
  id: '28',
  value: '陵水黎族自治县'
}, {admin_code: '469029', city_code: '50', id: '29', value: '保亭黎族苗族自治县'}, {
  admin_code: '469027',
  city_code: '50',
  id: '27',
  value: '乐东黎族自治县'
}, {admin_code: '460200', city_code: '1', id: '00', value: '三亚市'}, {
  admin_code: '441702',
  city_code: '285',
  id: '02',
  value: '江城区'
}, {admin_code: '441781', city_code: '285', id: '81', value: '阳春市'}, {
  admin_code: '441721',
  city_code: '285',
  id: '21',
  value: '阳西县'
}, {admin_code: '441704', city_code: '285', id: '04', value: '阳东区'}, {
  admin_code: '440900',
  city_code: '20',
  id: '00',
  value: '茂名市'
}, {admin_code: '440982', city_code: '22', id: '82', value: '化州市'}, {
  admin_code: '440983',
  city_code: '22',
  id: '83',
  value: '信宜市'
}, {admin_code: '440981', city_code: '22', id: '81', value: '高州市'}, {
  admin_code: '440904',
  city_code: '22',
  id: '04',
  value: '电白区'
}, {admin_code: '440802', city_code: '167', id: '02', value: '赤坎区'}, {
  admin_code: '440803',
  city_code: '167',
  id: '03',
  value: '霞山区'
}, {admin_code: '440804', city_code: '167', id: '04', value: '坡头区'}, {
  admin_code: '440811',
  city_code: '167',
  id: '11',
  value: '麻章区'
}, {admin_code: '440883', city_code: '167', id: '83', value: '吴川市'}, {
  admin_code: '440882',
  city_code: '167',
  id: '82',
  value: '雷州市'
}, {admin_code: '440881', city_code: '167', id: '81', value: '廉江市'}, {
  admin_code: '440823',
  city_code: '167',
  id: '23',
  value: '遂溪县'
}, {admin_code: '440825', city_code: '167', id: '25', value: '徐闻县'}, {
  admin_code: '330105',
  city_code: '23',
  id: '05',
  value: '拱墅区'
}, {admin_code: '330102', city_code: '23', id: '02', value: '上城区'}, {
  admin_code: '330103',
  city_code: '23',
  id: '03',
  value: '下城区'
}, {admin_code: '330104', city_code: '23', id: '04', value: '江干区'}, {
  admin_code: '330106',
  city_code: '23',
  id: '06',
  value: '西湖区'
}, {admin_code: '330108', city_code: '23', id: '08', value: '滨江区'}, {
  admin_code: '330110',
  city_code: '23',
  id: '10',
  value: '余杭区'
}, {admin_code: '330109', city_code: '23', id: '09', value: '萧山区'}, {
  admin_code: '330185',
  city_code: '23',
  id: '85',
  value: '临安市'
}, {admin_code: '330111', city_code: '23', id: '11', value: '富阳区'}, {
  admin_code: '330182',
  city_code: '23',
  id: '82',
  value: '建德市'
}, {admin_code: '330122', city_code: '23', id: '22', value: '桐庐县'}, {
  admin_code: '330127',
  city_code: '23',
  id: '27',
  value: '淳安县'
}, {admin_code: '330502', city_code: '116', id: '02', value: '吴兴区'}, {
  admin_code: '330503',
  city_code: '116',
  id: '03',
  value: '南浔区'
}, {admin_code: '330522', city_code: '116', id: '22', value: '长兴县'}, {
  admin_code: '330521',
  city_code: '116',
  id: '21',
  value: '德清县'
}, {admin_code: '330523', city_code: '116', id: '23', value: '安吉县'}, {
  admin_code: '330402',
  city_code: '286',
  id: '02',
  value: '南湖区'
}, {admin_code: '330411', city_code: '286', id: '11', value: '秀洲区'}, {
  admin_code: '330482',
  city_code: '286',
  id: '82',
  value: '平湖市'
}, {admin_code: '330481', city_code: '286', id: '81', value: '海宁市'}, {
  admin_code: '330483',
  city_code: '286',
  id: '83',
  value: '桐乡市'
}, {admin_code: '330421', city_code: '286', id: '21', value: '嘉善县'}, {
  admin_code: '330424',
  city_code: '286',
  id: '24',
  value: '海盐县'
}, {admin_code: '330802', city_code: '174', id: '02', value: '柯城区'}, {
  admin_code: '330803',
  city_code: '174',
  id: '03',
  value: '衢江区'
}, {admin_code: '330881', city_code: '174', id: '81', value: '江山市'}, {
  admin_code: '330822',
  city_code: '174',
  id: '22',
  value: '常山县'
}, {admin_code: '330824', city_code: '174', id: '24', value: '开化县'}, {
  admin_code: '330825',
  city_code: '174',
  id: '25',
  value: '龙游县'
}, {admin_code: '330702', city_code: '35', id: '02', value: '婺城区'}, {
  admin_code: '330703',
  city_code: '35',
  id: '03',
  value: '金东区'
}, {admin_code: '330781', city_code: '35', id: '81', value: '兰溪市'}, {
  admin_code: '330784',
  city_code: '35',
  id: '84',
  value: '永康市'
}, {admin_code: '330782', city_code: '35', id: '82', value: '义乌市'}, {
  admin_code: '330783',
  city_code: '35',
  id: '83',
  value: '东阳市'
}, {admin_code: '330723', city_code: '35', id: '23', value: '武义县'}, {
  admin_code: '330726',
  city_code: '35',
  id: '26',
  value: '浦江县'
}, {admin_code: '330727', city_code: '35', id: '27', value: '磐安县'}, {
  admin_code: '370811',
  city_code: '148',
  id: '11',
  value: '任城区'
}, {admin_code: '370829', city_code: '148', id: '29', value: '嘉祥县'}, {
  admin_code: '370828',
  city_code: '148',
  id: '28',
  value: '金乡县'
}, {admin_code: '370832', city_code: '148', id: '32', value: '梁山县'}, {
  admin_code: '370881',
  city_code: '148',
  id: '81',
  value: '曲阜市'
}, {admin_code: '370826', city_code: '148', id: '26', value: '微山县'}, {
  admin_code: '370827',
  city_code: '148',
  id: '27',
  value: '鱼台县'
}, {admin_code: '370883', city_code: '148', id: '83', value: '邹城市'}, {
  admin_code: '370812',
  city_code: '148',
  id: '12',
  value: '兖州区'
}, {admin_code: '370830', city_code: '148', id: '30', value: '汶上县'}, {
  admin_code: '370831',
  city_code: '148',
  id: '31',
  value: '泗水县'
}, {admin_code: '371702', city_code: '80', id: '02', value: '牡丹区'}, {
  admin_code: '371723',
  city_code: '80',
  id: '23',
  value: '成武县'
}, {admin_code: '371722', city_code: '80', id: '22', value: '单县'}, {
  admin_code: '371703',
  city_code: '80',
  id: '03',
  value: '定陶区'
}, {admin_code: '371728', city_code: '80', id: '28', value: '东明县'}, {
  admin_code: '371721',
  city_code: '80',
  id: '21',
  value: '曹县'
}, {admin_code: '371724', city_code: '80', id: '24', value: '巨野县'}, {
  admin_code: '371725',
  city_code: '80',
  id: '25',
  value: '郓城县'
}, {admin_code: '371726', city_code: '80', id: '26', value: '鄄城县'}, {
  admin_code: '370406',
  city_code: '272',
  id: '06',
  value: '山亭区'
}, {admin_code: '370405', city_code: '272', id: '05', value: '台儿庄区'}, {
  admin_code: '370481',
  city_code: '272',
  id: '81',
  value: '滕州市'
}, {admin_code: '371312', city_code: '339', id: '12', value: '河东区'}, {
  admin_code: '371325',
  city_code: '339',
  id: '25',
  value: '费县'
}, {admin_code: '371324', city_code: '339', id: '24', value: '兰陵县'}, {
  admin_code: '371329',
  city_code: '339',
  id: '29',
  value: '临沭县'
}, {admin_code: '371328', city_code: '339', id: '28', value: '蒙阴县'}, {
  admin_code: '371326',
  city_code: '339',
  id: '26',
  value: '平邑县'
}, {admin_code: '371321', city_code: '339', id: '21', value: '沂南县'}, {
  admin_code: '371323',
  city_code: '339',
  id: '23',
  value: '沂水县'
}, {admin_code: '371322', city_code: '339', id: '22', value: '郯城县'}, {
  admin_code: '371327',
  city_code: '339',
  id: '27',
  value: '莒南县'
}, {admin_code: '370113', city_code: '249', id: '13', value: '长清区'}, {
  admin_code: '370104',
  city_code: '249',
  id: '04',
  value: '槐荫区'
}, {admin_code: '370115', city_code: '249', id: '25', value: '济阳区'}, {
  admin_code: '370112',
  city_code: '249',
  id: '12',
  value: '历城区'
}, {admin_code: '370102', city_code: '249', id: '02', value: '历下区'}, {
  admin_code: '370124',
  city_code: '249',
  id: '24',
  value: '平阴县'
}, {admin_code: '370126', city_code: '249', id: '26', value: '商河县'}, {
  admin_code: '370103',
  city_code: '249',
  id: '03',
  value: '市中区'
}, {admin_code: '370105', city_code: '249', id: '05', value: '天桥区'}, {
  admin_code: '370114',
  city_code: '249',
  id: '14',
  value: '章丘区'
}, {admin_code: '370304', city_code: '84', id: '04', value: '博山区'}, {
  admin_code: '370322',
  city_code: '84',
  id: '22',
  value: '高青县'
}, {admin_code: '370321', city_code: '84', id: '21', value: '桓台县'}, {
  admin_code: '370305',
  city_code: '84',
  id: '05',
  value: '临淄区'
}, {admin_code: '370323', city_code: '84', id: '23', value: '沂源县'}, {
  admin_code: '370303',
  city_code: '84',
  id: '03',
  value: '张店区'
}, {admin_code: '370306', city_code: '84', id: '06', value: '周村区'}, {
  admin_code: '370302',
  city_code: '84',
  id: '02',
  value: '淄川区'
}, {admin_code: '371423', city_code: '7', id: '23', value: '庆云县'}, {
  admin_code: '371481',
  city_code: '7',
  id: '81',
  value: '乐陵市'
}, {admin_code: '371424', city_code: '7', id: '24', value: '临邑县'}, {
  admin_code: '371403',
  city_code: '7',
  id: '03',
  value: '陵城区'
}, {admin_code: '371422', city_code: '7', id: '22', value: '宁津县'}, {
  admin_code: '371426',
  city_code: '7',
  id: '26',
  value: '平原县'
}, {admin_code: '371425', city_code: '7', id: '25', value: '齐河县'}, {
  admin_code: '371428',
  city_code: '7',
  id: '28',
  value: '武城县'
}, {admin_code: '371427', city_code: '7', id: '27', value: '夏津县'}, {
  admin_code: '371482',
  city_code: '7',
  id: '82',
  value: '禹城市'
}, {admin_code: '370923', city_code: '195', id: '23', value: '东平县'}, {
  admin_code: '370983',
  city_code: '195',
  id: '83',
  value: '肥城市'
}, {admin_code: '370921', city_code: '195', id: '21', value: '宁阳县'}, {
  admin_code: '370902',
  city_code: '195',
  id: '02',
  value: '泰山区'
}, {admin_code: '370982', city_code: '195', id: '82', value: '新泰市'}, {
  admin_code: '371602',
  city_code: '196',
  id: '02',
  value: '滨城区'
}, {admin_code: '371625', city_code: '196', id: '25', value: '博兴县'}, {
  admin_code: '371621',
  city_code: '196',
  id: '21',
  value: '惠民县'
}, {admin_code: '371623', city_code: '196', id: '23', value: '无棣县'}, {
  admin_code: '371622',
  city_code: '196',
  id: '22',
  value: '阳信县'
}, {admin_code: '371603', city_code: '196', id: '03', value: '沾化区'}, {
  admin_code: '371681',
  city_code: '196',
  id: '26',
  value: '邹平市'
}, {admin_code: '370502', city_code: '78', id: '02', value: '东营区'}, {
  admin_code: '370523',
  city_code: '78',
  id: '23',
  value: '广饶县'
}, {admin_code: '370503', city_code: '78', id: '03', value: '河口区'}, {
  admin_code: '370505',
  city_code: '78',
  id: '05',
  value: '垦利区'
}, {admin_code: '370522', city_code: '78', id: '22', value: '利津县'}, {
  admin_code: '371203',
  city_code: '34',
  id: '03',
  value: '钢城区'
}, {admin_code: '371202', city_code: '34', id: '02', value: '莱城区'}, {
  admin_code: '371523',
  city_code: '246',
  id: '23',
  value: '茌平县'
}, {admin_code: '371524', city_code: '246', id: '24', value: '东阿县'}, {
  admin_code: '371526',
  city_code: '246',
  id: '26',
  value: '高唐县'
}, {admin_code: '371525', city_code: '246', id: '25', value: '冠县'}, {
  admin_code: '371502',
  city_code: '246',
  id: '02',
  value: '东昌府区'
}, {admin_code: '371581', city_code: '246', id: '81', value: '临清市'}, {
  admin_code: '371522',
  city_code: '246',
  id: '22',
  value: '莘县'
}, {admin_code: '371521', city_code: '246', id: '21', value: '阳谷县'}, {
  admin_code: '211302',
  city_code: '247',
  id: '02',
  value: '双塔区'
}, {admin_code: '211303', city_code: '247', id: '03', value: '龙城区'}, {
  admin_code: '211381',
  city_code: '247',
  id: '81',
  value: '北票市'
}, {admin_code: '211382', city_code: '247', id: '82', value: '凌源市'}, {
  admin_code: '211321',
  city_code: '247',
  id: '21',
  value: '朝阳县'
}, {admin_code: '211322', city_code: '247', id: '22', value: '建平县'}, {
  admin_code: '211324',
  city_code: '247',
  id: '24',
  value: '喀喇沁左翼蒙古族自治县'
}, {admin_code: '210902', city_code: '79', id: '02', value: '海州区'}, {
  admin_code: '210903',
  city_code: '79',
  id: '03',
  value: '新邱区'
}, {admin_code: '210904', city_code: '79', id: '04', value: '太平区'}, {
  admin_code: '210905',
  city_code: '79',
  id: '05',
  value: '清河门区'
}, {admin_code: '210911', city_code: '79', id: '11', value: '细河区'}, {
  admin_code: '210922',
  city_code: '79',
  id: '22',
  value: '彰武县'
}, {admin_code: '210921', city_code: '79', id: '21', value: '阜新蒙古族自治县'}, {
  admin_code: '211103',
  city_code: '173',
  id: '03',
  value: '兴隆台区'
}, {admin_code: '211102', city_code: '173', id: '02', value: '双台子区'}, {
  admin_code: '211104',
  city_code: '173',
  id: '04',
  value: '大洼区'
}, {admin_code: '211122', city_code: '173', id: '22', value: '盘山县'}, {
  admin_code: '210711',
  city_code: '36',
  id: '11',
  value: '太和区'
}, {admin_code: '210702', city_code: '36', id: '02', value: '古塔区'}, {
  admin_code: '210703',
  city_code: '36',
  id: '03',
  value: '凌河区'
}, {admin_code: '210781', city_code: '36', id: '81', value: '凌海市'}, {
  admin_code: '210782',
  city_code: '36',
  id: '82',
  value: '北镇市'
}, {admin_code: '210726', city_code: '36', id: '26', value: '黑山县'}, {
  admin_code: '210727',
  city_code: '36',
  id: '27',
  value: '义县'
}, {admin_code: '211403', city_code: '81', id: '03', value: '龙港区'}, {
  admin_code: '211402',
  city_code: '81',
  id: '02',
  value: '连山区'
}, {admin_code: '211404', city_code: '81', id: '04', value: '南票区'}, {
  admin_code: '211481',
  city_code: '81',
  id: '81',
  value: '兴城市'
}, {admin_code: '211421', city_code: '81', id: '21', value: '绥中县'}, {
  admin_code: '211422',
  city_code: '81',
  id: '22',
  value: '建昌县'
}, {admin_code: '150402', city_code: '8', id: '02', value: '红山区'}, {
  admin_code: '150403',
  city_code: '8',
  id: '03',
  value: '元宝山区'
}, {admin_code: '150404', city_code: '8', id: '04', value: '松山区'}, {
  admin_code: '150429',
  city_code: '8',
  id: '29',
  value: '宁城县'
}, {admin_code: '150424', city_code: '8', id: '24', value: '林西县'}, {
  admin_code: '150421',
  city_code: '8',
  id: '21',
  value: '阿鲁科尔沁旗'
}, {admin_code: '150422', city_code: '8', id: '22', value: '巴林左旗'}, {
  admin_code: '150423',
  city_code: '8',
  id: '23',
  value: '巴林右旗'
}, {admin_code: '150425', city_code: '8', id: '25', value: '克什克腾旗'}, {
  admin_code: '150426',
  city_code: '8',
  id: '26',
  value: '翁牛特旗'
}, {admin_code: '150428', city_code: '8', id: '28', value: '喀喇沁旗'}, {
  admin_code: '150430',
  city_code: '8',
  id: '30',
  value: '敖汉旗'
}, {admin_code: '530103', city_code: '248', id: '03', value: '盘龙区'}, {
  admin_code: '530102',
  city_code: '248',
  id: '02',
  value: '五华区'
}, {admin_code: '530111', city_code: '248', id: '11', value: '官渡区'}, {
  admin_code: '530112',
  city_code: '248',
  id: '12',
  value: '西山区'
}, {admin_code: '530113', city_code: '248', id: '13', value: '东川区'}, {
  admin_code: '530181',
  city_code: '248',
  id: '81',
  value: '安宁市'
}, {admin_code: '530114', city_code: '248', id: '14', value: '呈贡区'}, {
  admin_code: '530115',
  city_code: '248',
  id: '15',
  value: '晋宁区'
}, {admin_code: '530124', city_code: '248', id: '24', value: '富民县'}, {
  admin_code: '530125',
  city_code: '248',
  id: '25',
  value: '宜良县'
}, {admin_code: '530127', city_code: '248', id: '27', value: '嵩明县'}, {
  admin_code: '530126',
  city_code: '248',
  id: '26',
  value: '石林彝族自治县'
}, {admin_code: '530128', city_code: '248', id: '28', value: '禄劝彝族苗族自治县'}, {
  admin_code: '530129',
  city_code: '248',
  id: '29',
  value: '寻甸回族彝族自治县'
}, {admin_code: '530302', city_code: '312', id: '02', value: '麒麟区'}, {
  admin_code: '530381',
  city_code: '312',
  id: '81',
  value: '宣威市'
}, {admin_code: '530304', city_code: '312', id: '21', value: '马龙区'}, {
  admin_code: '530303',
  city_code: '312',
  id: '03',
  value: '沾益区'
}, {admin_code: '530325', city_code: '312', id: '25', value: '富源县'}, {
  admin_code: '530324',
  city_code: '312',
  id: '24',
  value: '罗平县'
}, {admin_code: '530323', city_code: '312', id: '23', value: '师宗县'}, {
  admin_code: '530322',
  city_code: '312',
  id: '22',
  value: '陆良县'
}, {admin_code: '530326', city_code: '312', id: '26', value: '会泽县'}, {
  admin_code: '530402',
  city_code: '67',
  id: '02',
  value: '红塔区'
}, {admin_code: '530403', city_code: '67', id: '03', value: '江川区'}, {
  admin_code: '530422',
  city_code: '67',
  id: '22',
  value: '澄江县'
}, {admin_code: '530423', city_code: '67', id: '23', value: '通海县'}, {
  admin_code: '530424',
  city_code: '67',
  id: '24',
  value: '华宁县'
}, {admin_code: '530425', city_code: '67', id: '25', value: '易门县'}, {
  admin_code: '530426',
  city_code: '67',
  id: '26',
  value: '峨山彝族自治县'
}, {admin_code: '530427', city_code: '67', id: '27', value: '新平彝族傣族自治县'}, {
  admin_code: '530428',
  city_code: '67',
  id: '28',
  value: '元江哈尼族彝族傣族自治县'
}, {admin_code: '530502', city_code: '328', id: '02', value: '隆阳区'}, {
  admin_code: '530521',
  city_code: '328',
  id: '21',
  value: '施甸县'
}, {admin_code: '530581', city_code: '328', id: '81', value: '腾冲市'}, {
  admin_code: '530523',
  city_code: '328',
  id: '23',
  value: '龙陵县'
}, {admin_code: '530524', city_code: '328', id: '24', value: '昌宁县'}, {
  admin_code: '530602',
  city_code: '112',
  id: '02',
  value: '昭阳区'
}, {admin_code: '530621', city_code: '112', id: '21', value: '鲁甸县'}, {
  admin_code: '530622',
  city_code: '112',
  id: '22',
  value: '巧家县'
}, {admin_code: '530623', city_code: '112', id: '23', value: '盐津县'}, {
  admin_code: '530624',
  city_code: '112',
  id: '24',
  value: '大关县'
}, {admin_code: '530625', city_code: '112', id: '25', value: '永善县'}, {
  admin_code: '530626',
  city_code: '112',
  id: '26',
  value: '绥江县'
}, {admin_code: '530628', city_code: '112', id: '28', value: '彝良县'}, {
  admin_code: '530629',
  city_code: '112',
  id: '29',
  value: '威信县'
}, {admin_code: '530702', city_code: '44', id: '02', value: '古城区'}, {
  admin_code: '530722',
  city_code: '44',
  id: '22',
  value: '永胜县'
}, {admin_code: '530723', city_code: '44', id: '23', value: '华坪县'}, {
  admin_code: '530721',
  city_code: '44',
  id: '21',
  value: '玉龙纳西族自治县'
}, {admin_code: '530724', city_code: '44', id: '24', value: '宁蒗彝族自治县'}, {
  admin_code: '530802',
  city_code: '345',
  id: '02',
  value: '思茅区'
}, {admin_code: '530821', city_code: '345', id: '21', value: '宁洱哈尼族彝族自治县'}, {
  admin_code: '530822',
  city_code: '345',
  id: '22',
  value: '墨江哈尼族自治县'
}, {admin_code: '530823', city_code: '345', id: '23', value: '景东彝族自治县'}, {
  admin_code: '530824',
  city_code: '345',
  id: '24',
  value: '景谷傣族彝族自治县'
}, {admin_code: '530825', city_code: '345', id: '25', value: '镇沅彝族哈尼族拉祜族自治县'}, {
  admin_code: '530826',
  city_code: '345',
  id: '26',
  value: '江城哈尼族彝族自治县'
}, {admin_code: '530827', city_code: '345', id: '27', value: '孟连傣族拉祜族佤族自治县'}, {
  admin_code: '530828',
  city_code: '345',
  id: '28',
  value: '澜沧拉祜族自治县'
}, {admin_code: '530829', city_code: '345', id: '29', value: '西盟佤族自治县'}, {
  admin_code: '530902',
  city_code: '223',
  id: '02',
  value: '临翔区'
}, {admin_code: '530921', city_code: '223', id: '21', value: '凤庆县'}, {
  admin_code: '530922',
  city_code: '223',
  id: '22',
  value: '云县'
}, {admin_code: '530923', city_code: '223', id: '23', value: '永德县'}, {
  admin_code: '530924',
  city_code: '223',
  id: '24',
  value: '镇康县'
}, {admin_code: '530925', city_code: '223', id: '25', value: '双江拉祜族佤族布朗族傣族自治县'}, {
  admin_code: '530926',
  city_code: '223',
  id: '26',
  value: '耿马傣族佤族自治县'
}, {admin_code: '530927', city_code: '223', id: '27', value: '沧源佤族自治县'}, {
  admin_code: '533103',
  city_code: '313',
  id: '03',
  value: '芒市'
}, {admin_code: '533102', city_code: '313', id: '02', value: '瑞丽市'}, {
  admin_code: '533122',
  city_code: '313',
  id: '22',
  value: '梁河县'
}, {admin_code: '533123', city_code: '313', id: '23', value: '盈江县'}, {
  admin_code: '533124',
  city_code: '313',
  id: '24',
  value: '陇川县'
}, {admin_code: '533301', city_code: '258', id: '01', value: '泸水市'}, {
  admin_code: '533323',
  city_code: '258',
  id: '23',
  value: '福贡县'
}, {admin_code: '533324', city_code: '258', id: '24', value: '贡山独龙族怒族自治县'}, {
  admin_code: '533325',
  city_code: '258',
  id: '25',
  value: '兰坪白族普米族自治县'
}, {admin_code: '533401', city_code: '344', id: '01', value: '香格里拉市'}, {
  admin_code: '533422',
  city_code: '344',
  id: '22',
  value: '德钦县'
}, {admin_code: '533423', city_code: '344', id: '23', value: '维西傈僳族自治县'}, {
  admin_code: '532901',
  city_code: '160',
  id: '01',
  value: '大理市'
}, {admin_code: '532923', city_code: '160', id: '23', value: '祥云县'}, {
  admin_code: '532924',
  city_code: '160',
  id: '24',
  value: '宾川县'
}, {admin_code: '532925', city_code: '160', id: '25', value: '弥渡县'}, {
  admin_code: '532928',
  city_code: '160',
  id: '28',
  value: '永平县'
}, {admin_code: '532929', city_code: '160', id: '29', value: '云龙县'}, {
  admin_code: '532930',
  city_code: '160',
  id: '30',
  value: '洱源县'
}, {admin_code: '532931', city_code: '160', id: '31', value: '剑川县'}, {
  admin_code: '532932',
  city_code: '160',
  id: '32',
  value: '鹤庆县'
}, {admin_code: '532922', city_code: '160', id: '22', value: '漾濞彝族自治县'}, {
  admin_code: '532926',
  city_code: '160',
  id: '26',
  value: '南涧彝族自治县'
}, {admin_code: '532927', city_code: '160', id: '27', value: '巍山彝族回族自治县'}, {
  admin_code: '532301',
  city_code: '161',
  id: '01',
  value: '楚雄市'
}, {admin_code: '532322', city_code: '161', id: '22', value: '双柏县'}, {
  admin_code: '532323',
  city_code: '161',
  id: '23',
  value: '牟定县'
}, {admin_code: '532324', city_code: '161', id: '24', value: '南华县'}, {
  admin_code: '532325',
  city_code: '161',
  id: '25',
  value: '姚安县'
}, {admin_code: '532326', city_code: '161', id: '26', value: '大姚县'}, {
  admin_code: '532327',
  city_code: '161',
  id: '27',
  value: '永仁县'
}, {admin_code: '532328', city_code: '161', id: '28', value: '元谋县'}, {
  admin_code: '532329',
  city_code: '161',
  id: '29',
  value: '武定县'
}, {admin_code: '532331', city_code: '161', id: '31', value: '禄丰县'}, {
  admin_code: '532501',
  city_code: '108',
  id: '01',
  value: '个旧市'
}, {admin_code: '532502', city_code: '108', id: '02', value: '开远市'}, {
  admin_code: '532503',
  city_code: '108',
  id: '03',
  value: '蒙自市'
}, {admin_code: '532531', city_code: '108', id: '31', value: '绿春县'}, {
  admin_code: '532524',
  city_code: '108',
  id: '24',
  value: '建水县'
}, {admin_code: '532525', city_code: '108', id: '25', value: '石屏县'}, {
  admin_code: '532504',
  city_code: '108',
  id: '04',
  value: '弥勒市'
}, {admin_code: '532527', city_code: '108', id: '27', value: '泸西县'}, {
  admin_code: '532528',
  city_code: '108',
  id: '28',
  value: '元阳县'
}, {admin_code: '532529', city_code: '108', id: '29', value: '红河县'}, {
  admin_code: '532530',
  city_code: '108',
  id: '30',
  value: '金平苗族瑶族傣族自治县'
}, {admin_code: '532532', city_code: '108', id: '32', value: '河口瑶族自治县'}, {
  admin_code: '532523',
  city_code: '108',
  id: '23',
  value: '屏边苗族自治县'
}, {admin_code: '532601', city_code: '166', id: '01', value: '文山市'}, {
  admin_code: '532622',
  city_code: '166',
  id: '22',
  value: '砚山县'
}, {admin_code: '532623', city_code: '166', id: '23', value: '西畴县'}, {
  admin_code: '532624',
  city_code: '166',
  id: '24',
  value: '麻栗坡县'
}, {admin_code: '532625', city_code: '166', id: '25', value: '马关县'}, {
  admin_code: '532626',
  city_code: '166',
  id: '26',
  value: '丘北县'
}, {admin_code: '532627', city_code: '166', id: '27', value: '广南县'}, {
  admin_code: '532628',
  city_code: '166',
  id: '28',
  value: '富宁县'
}, {admin_code: '532801', city_code: '20', id: '01', value: '景洪市'}, {
  admin_code: '532822',
  city_code: '20',
  id: '22',
  value: '勐海县'
}, {admin_code: '532823', city_code: '20', id: '23', value: '勐腊县'}, {
  admin_code: '513401',
  city_code: '51',
  id: '01',
  value: '西昌市'
}, {admin_code: '513423', city_code: '51', id: '23', value: '盐源县'}, {
  admin_code: '513424',
  city_code: '51',
  id: '24',
  value: '德昌县'
}, {admin_code: '513427', city_code: '51', id: '27', value: '宁南县'}, {
  admin_code: '513428',
  city_code: '51',
  id: '28',
  value: '普格县'
}, {admin_code: '513429', city_code: '51', id: '29', value: '布拖县'}, {
  admin_code: '513430',
  city_code: '51',
  id: '30',
  value: '金阳县'
}, {admin_code: '513431', city_code: '51', id: '31', value: '昭觉县'}, {
  admin_code: '513432',
  city_code: '51',
  id: '32',
  value: '喜德县'
}, {admin_code: '513433', city_code: '51', id: '33', value: '冕宁县'}, {
  admin_code: '513434',
  city_code: '51',
  id: '34',
  value: '越西县'
}, {admin_code: '513435', city_code: '51', id: '35', value: '甘洛县'}, {
  admin_code: '513436',
  city_code: '51',
  id: '36',
  value: '美姑县'
}, {admin_code: '513437', city_code: '51', id: '37', value: '雷波县'}, {
  admin_code: '513422',
  city_code: '51',
  id: '22',
  value: '木里藏族自治县'
}, {admin_code: '510402', city_code: '24', id: '02', value: '东区'}, {
  admin_code: '510403',
  city_code: '24',
  id: '03',
  value: '西区'
}, {admin_code: '510411', city_code: '24', id: '11', value: '仁和区'}, {
  admin_code: '510421',
  city_code: '24',
  id: '21',
  value: '米易县'
}, {admin_code: '510422', city_code: '24', id: '22', value: '盐边县'}, {
  admin_code: '513425',
  city_code: '51',
  id: '25',
  value: '会理县'
}, {admin_code: '513426', city_code: '51', id: '26', value: '会东县'}, {
  admin_code: '620102',
  city_code: '164',
  id: '02',
  value: '城关区'
}, {admin_code: '620103', city_code: '164', id: '03', value: '七里河区'}, {
  admin_code: '620104',
  city_code: '164',
  id: '04',
  value: '西固区'
}, {admin_code: '620105', city_code: '164', id: '05', value: '安宁区'}, {
  admin_code: '620111',
  city_code: '164',
  id: '11',
  value: '红古区'
}, {admin_code: '620121', city_code: '164', id: '21', value: '永登县'}, {
  admin_code: '620122',
  city_code: '164',
  id: '22',
  value: '皋兰县'
}, {admin_code: '620123', city_code: '164', id: '23', value: '榆中县'}, {
  admin_code: '620200',
  city_code: '151',
  id: '00',
  value: '嘉峪关市'
}, {admin_code: '620302', city_code: '152', id: '02', value: '金川区'}, {
  admin_code: '620321',
  city_code: '152',
  id: '21',
  value: '永昌县'
}, {admin_code: '620402', city_code: '119', id: '02', value: '白银区'}, {
  admin_code: '620403',
  city_code: '119',
  id: '03',
  value: '平川区'
}, {admin_code: '620421', city_code: '119', id: '21', value: '靖远县'}, {
  admin_code: '620422',
  city_code: '119',
  id: '22',
  value: '会宁县'
}, {admin_code: '620423', city_code: '119', id: '23', value: '景泰县'}, {
  admin_code: '620503',
  city_code: '218',
  id: '03',
  value: '麦积区'
}, {admin_code: '620521', city_code: '218', id: '21', value: '清水县'}, {
  admin_code: '620522',
  city_code: '218',
  id: '22',
  value: '秦安县'
}, {admin_code: '620523', city_code: '218', id: '23', value: '甘谷县'}, {
  admin_code: '620524',
  city_code: '218',
  id: '24',
  value: '武山县'
}, {admin_code: '620525', city_code: '218', id: '25', value: '张家川回族自治县'}, {
  admin_code: '620602',
  city_code: '158',
  id: '02',
  value: '凉州区'
}, {admin_code: '620621', city_code: '158', id: '21', value: '民勤县'}, {
  admin_code: '620622',
  city_code: '158',
  id: '22',
  value: '古浪县'
}, {admin_code: '620623', city_code: '158', id: '23', value: '天祝藏族自治县'}, {
  admin_code: '620902',
  city_code: '237',
  id: '02',
  value: '肃州区'
}, {admin_code: '620981', city_code: '237', id: '81', value: '玉门市'}, {
  admin_code: '620982',
  city_code: '237',
  id: '82',
  value: '敦煌市'
}, {admin_code: '620921', city_code: '237', id: '21', value: '金塔县'}, {
  admin_code: '620922',
  city_code: '237',
  id: '22',
  value: '瓜州县'
}, {admin_code: '620923', city_code: '237', id: '23', value: '肃北蒙古族自治县'}, {
  admin_code: '620924',
  city_code: '237',
  id: '24',
  value: '阿克塞哈萨克族自治县'
}, {admin_code: '620700', city_code: '101', id: '00', value: '张掖市'}, {
  admin_code: '620702',
  city_code: '103',
  id: '02',
  value: '甘州区'
}, {admin_code: '620722', city_code: '103', id: '22', value: '民乐县'}, {
  admin_code: '620723',
  city_code: '103',
  id: '23',
  value: '临泽县'
}, {admin_code: '620724', city_code: '103', id: '24', value: '高台县'}, {
  admin_code: '620725',
  city_code: '103',
  id: '25',
  value: '山丹县'
}, {admin_code: '620721', city_code: '103', id: '21', value: '肃南裕固族自治县'}, {
  admin_code: '620802',
  city_code: '154',
  id: '02',
  value: '崆峒区'
}, {admin_code: '620821', city_code: '154', id: '21', value: '泾川县'}, {
  admin_code: '620822',
  city_code: '154',
  id: '22',
  value: '灵台县'
}, {admin_code: '620823', city_code: '154', id: '23', value: '崇信县'}, {
  admin_code: '620881',
  city_code: '154',
  id: '24',
  value: '华亭市'
}, {admin_code: '620825', city_code: '154', id: '25', value: '庄浪县'}, {
  admin_code: '620826',
  city_code: '154',
  id: '26',
  value: '静宁县'
}, {admin_code: '621102', city_code: '104', id: '02', value: '安定区'}, {
  admin_code: '621121',
  city_code: '104',
  id: '21',
  value: '通渭县'
}, {admin_code: '621124', city_code: '104', id: '24', value: '临洮县'}, {
  admin_code: '621125',
  city_code: '104',
  id: '25',
  value: '漳县'
}, {admin_code: '621126', city_code: '104', id: '26', value: '岷县'}, {
  admin_code: '621123',
  city_code: '104',
  id: '23',
  value: '渭源县'
}, {admin_code: '621122', city_code: '104', id: '22', value: '陇西县'}, {
  admin_code: '621221',
  city_code: '52',
  id: '21',
  value: '成县'
}, {admin_code: '621202', city_code: '52', id: '02', value: '武都区'}, {
  admin_code: '621223',
  city_code: '52',
  id: '23',
  value: '宕昌县'
}, {admin_code: '621224', city_code: '52', id: '24', value: '康县'}, {
  admin_code: '621225',
  city_code: '52',
  id: '25',
  value: '西和县'
}, {admin_code: '621226', city_code: '52', id: '26', value: '礼县'}, {
  admin_code: '621228',
  city_code: '52',
  id: '28',
  value: '两当县'
}, {admin_code: '621227', city_code: '52', id: '27', value: '徽县'}, {
  admin_code: '622901',
  city_code: '149',
  id: '01',
  value: '临夏市'
}, {admin_code: '622921', city_code: '149', id: '21', value: '临夏县'}, {
  admin_code: '622922',
  city_code: '149',
  id: '22',
  value: '康乐县'
}, {admin_code: '622923', city_code: '149', id: '23', value: '永靖县'}, {
  admin_code: '622924',
  city_code: '149',
  id: '24',
  value: '广河县'
}, {admin_code: '622925', city_code: '149', id: '25', value: '和政县'}, {
  admin_code: '622926',
  city_code: '149',
  id: '26',
  value: '东乡族自治县'
}, {admin_code: '622927', city_code: '149', id: '27', value: '积石山保安族东乡族撒拉族自治县'}, {
  admin_code: '623001',
  city_code: '105',
  id: '01',
  value: '合作市'
}, {admin_code: '623021', city_code: '105', id: '21', value: '临潭县'}, {
  admin_code: '623022',
  city_code: '105',
  id: '22',
  value: '卓尼县'
}, {admin_code: '623023', city_code: '105', id: '23', value: '舟曲县'}, {
  admin_code: '623024',
  city_code: '105',
  id: '24',
  value: '迭部县'
}, {admin_code: '623025', city_code: '105', id: '25', value: '玛曲县'}, {
  admin_code: '623026',
  city_code: '105',
  id: '26',
  value: '碌曲县'
}, {admin_code: '623027', city_code: '105', id: '27', value: '夏河县'}, {
  admin_code: '152922',
  city_code: '197',
  id: '22',
  value: '阿拉善右旗'
}, {admin_code: '330203', city_code: '322', id: '03', value: '海曙区'}, {
  admin_code: '330204',
  city_code: '321',
  id: '04',
  value: '江东区'
}, {admin_code: '330205', city_code: '322', id: '05', value: '江北区'}, {
  admin_code: '330206',
  city_code: '322',
  id: '06',
  value: '北仑区'
}, {admin_code: '330211', city_code: '322', id: '11', value: '镇海区'}, {
  admin_code: '330212',
  city_code: '322',
  id: '12',
  value: '鄞州区'
}, {admin_code: '330282', city_code: '322', id: '82', value: '慈溪市'}, {
  admin_code: '330281',
  city_code: '322',
  id: '81',
  value: '余姚市'
}, {admin_code: '330213', city_code: '322', id: '13', value: '奉化区'}, {
  admin_code: '330226',
  city_code: '322',
  id: '26',
  value: '宁海县'
}, {admin_code: '330225', city_code: '322', id: '25', value: '象山县'}, {
  admin_code: '330602',
  city_code: '257',
  id: '02',
  value: '越城区'
}, {admin_code: '330681', city_code: '257', id: '81', value: '诸暨市'}, {
  admin_code: '330604',
  city_code: '257',
  id: '04',
  value: '上虞区'
}, {admin_code: '330683', city_code: '257', id: '83', value: '嵊州市'}, {
  admin_code: '330603',
  city_code: '257',
  id: '03',
  value: '柯桥区'
}, {admin_code: '330624', city_code: '257', id: '24', value: '新昌县'}, {
  admin_code: '331002',
  city_code: '273',
  id: '02',
  value: '椒江区'
}, {admin_code: '331003', city_code: '273', id: '03', value: '黄岩区'}, {
  admin_code: '331004',
  city_code: '273',
  id: '04',
  value: '路桥区'
}, {admin_code: '331082', city_code: '273', id: '82', value: '临海市'}, {
  admin_code: '331081',
  city_code: '273',
  id: '81',
  value: '温岭市'
}, {admin_code: '331022', city_code: '273', id: '22', value: '三门县'}, {
  admin_code: '331023',
  city_code: '273',
  id: '23',
  value: '天台县'
}, {admin_code: '331024', city_code: '273', id: '24', value: '仙居县'}, {
  admin_code: '331083',
  city_code: '273',
  id: '83',
  value: '玉环市'
}, {admin_code: '330302', city_code: '208', id: '02', value: '鹿城区'}, {
  admin_code: '330303',
  city_code: '208',
  id: '03',
  value: '龙湾区'
}, {admin_code: '330304', city_code: '208', id: '04', value: '瓯海区'}, {
  admin_code: '330381',
  city_code: '208',
  id: '81',
  value: '瑞安市'
}, {admin_code: '330382', city_code: '208', id: '82', value: '乐清市'}, {
  admin_code: '330324',
  city_code: '208',
  id: '24',
  value: '永嘉县'
}, {admin_code: '330328', city_code: '208', id: '28', value: '文成县'}, {
  admin_code: '330326',
  city_code: '208',
  id: '26',
  value: '平阳县'
}, {admin_code: '330329', city_code: '208', id: '29', value: '泰顺县'}, {
  admin_code: '330305',
  city_code: '208',
  id: '05',
  value: '洞头区'
}, {admin_code: '330327', city_code: '208', id: '27', value: '苍南县'}, {
  admin_code: '330902',
  city_code: '106',
  id: '02',
  value: '定海区'
}, {admin_code: '330903', city_code: '106', id: '03', value: '普陀区'}, {
  admin_code: '330921',
  city_code: '106',
  id: '21',
  value: '岱山县'
}, {admin_code: '330922', city_code: '106', id: '22', value: '嵊泗县'}, {
  admin_code: '331102',
  city_code: '107',
  id: '02',
  value: '莲都区'
}, {admin_code: '331181', city_code: '107', id: '81', value: '龙泉市'}, {
  admin_code: '331122',
  city_code: '107',
  id: '22',
  value: '缙云县'
}, {admin_code: '331121', city_code: '107', id: '21', value: '青田县'}, {
  admin_code: '331125',
  city_code: '107',
  id: '25',
  value: '云和县'
}, {admin_code: '331123', city_code: '107', id: '23', value: '遂昌县'}, {
  admin_code: '331124',
  city_code: '107',
  id: '24',
  value: '松阳县'
}, {admin_code: '331126', city_code: '107', id: '26', value: '庆元县'}, {
  admin_code: '331127',
  city_code: '107',
  id: '27',
  value: '景宁畲族自治县'
}, {admin_code: '360829', city_code: '283', id: '29', value: '安福县'}, {
  admin_code: '360123',
  city_code: '175',
  id: '23',
  value: '安义县'
}, {admin_code: '360302', city_code: '82', id: '02', value: '安源区'}, {
  admin_code: '360726',
  city_code: '41',
  id: '26',
  value: '安远县'
}, {admin_code: '361128', city_code: '216', id: '28', value: '鄱阳县'}, {
  admin_code: '360202',
  city_code: '90',
  id: '02',
  value: '昌江区'
}, {admin_code: '361024', city_code: '219', id: '24', value: '崇仁县'}, {
  admin_code: '360725',
  city_code: '41',
  id: '25',
  value: '崇义县'
}, {admin_code: '360723', city_code: '41', id: '23', value: '大余县'}, {
  admin_code: '360426',
  city_code: '135',
  id: '26',
  value: '德安县'
}, {admin_code: '361181', city_code: '216', id: '81', value: '德兴市'}, {
  admin_code: '360728',
  city_code: '41',
  id: '28',
  value: '定南县'
}, {admin_code: '360102', city_code: '175', id: '02', value: '东湖区'}, {
  admin_code: '361003',
  city_code: '219',
  id: '03',
  value: '东乡区'
}, {admin_code: '360428', city_code: '135', id: '28', value: '都昌县'}, {
  admin_code: '360521',
  city_code: '185',
  id: '21',
  value: '分宜县'
}, {admin_code: '360981', city_code: '184', id: '81', value: '丰城市'}, {
  admin_code: '360921',
  city_code: '184',
  id: '21',
  value: '奉新县'
}, {admin_code: '360222', city_code: '90', id: '22', value: '浮梁县'}, {
  admin_code: '360704',
  city_code: '41',
  id: '04',
  value: '赣县区'
}, {admin_code: '360983', city_code: '184', id: '83', value: '高安市'}, {
  admin_code: '361030',
  city_code: '219',
  id: '30',
  value: '广昌县'
}, {admin_code: '361103', city_code: '216', id: '03', value: '广丰区'}, {
  admin_code: '360681',
  city_code: '89',
  id: '81',
  value: '贵溪市'
}, {admin_code: '361125', city_code: '216', id: '25', value: '横峰县'}, {
  admin_code: '360429',
  city_code: '135',
  id: '29',
  value: '湖口县'
}, {admin_code: '360733', city_code: '41', id: '33', value: '会昌县'}, {
  admin_code: '360822',
  city_code: '283',
  id: '22',
  value: '吉水县'
}, {admin_code: '360802', city_code: '283', id: '02', value: '吉州区'}, {
  admin_code: '361027',
  city_code: '219',
  id: '27',
  value: '金溪县'
}, {admin_code: '360124', city_code: '175', id: '24', value: '进贤县'}, {
  admin_code: '360881',
  city_code: '283',
  id: '81',
  value: '井冈山市'
}, {admin_code: '360925', city_code: '184', id: '25', value: '靖安县'}, {
  admin_code: '360421',
  city_code: '135',
  id: '21',
  value: '九江县'
}, {admin_code: '361025', city_code: '219', id: '25', value: '乐安县'}, {
  admin_code: '360281',
  city_code: '90',
  id: '81',
  value: '乐平市'
}, {admin_code: '361022', city_code: '219', id: '22', value: '黎川县'}, {
  admin_code: '360321',
  city_code: '82',
  id: '21',
  value: '莲花县'
}, {admin_code: '361002', city_code: '219', id: '02', value: '临川区'}, {
  admin_code: '360727',
  city_code: '41',
  id: '27',
  value: '龙南县'
}, {admin_code: '360402', city_code: '135', id: '02', value: '濂溪区'}, {
  admin_code: '360323',
  city_code: '82',
  id: '23',
  value: '芦溪县'
}, {admin_code: '360121', city_code: '175', id: '21', value: '南昌县'}, {
  admin_code: '361021',
  city_code: '219',
  id: '21',
  value: '南城县'
}, {admin_code: '361023', city_code: '219', id: '23', value: '南丰县'}, {
  admin_code: '360703',
  city_code: '41',
  id: '03',
  value: '南康区'
}, {admin_code: '360730', city_code: '41', id: '30', value: '宁都县'}, {
  admin_code: '360430',
  city_code: '135',
  id: '30',
  value: '彭泽县'
}, {admin_code: '361124', city_code: '216', id: '24', value: '铅山县'}, {
  admin_code: '360111',
  city_code: '175',
  id: '11',
  value: '青山湖区'
}, {admin_code: '360104', city_code: '175', id: '04', value: '青云谱区'}, {
  admin_code: '360729',
  city_code: '41',
  id: '29',
  value: '全南县'
}, {admin_code: '360481', city_code: '135', id: '81', value: '瑞昌市'}, {
  admin_code: '360781',
  city_code: '41',
  id: '81',
  value: '瑞金市'
}, {admin_code: '360923', city_code: '184', id: '23', value: '上高县'}, {
  admin_code: '360322',
  city_code: '82',
  id: '22',
  value: '上栗县'
}, {admin_code: '360724', city_code: '41', id: '24', value: '上犹县'}, {
  admin_code: '360735',
  city_code: '41',
  id: '35',
  value: '石城县'
}, {admin_code: '360827', city_code: '283', id: '27', value: '遂川县'}, {
  admin_code: '360826',
  city_code: '283',
  id: '26',
  value: '泰和县'
}, {admin_code: '360926', city_code: '184', id: '26', value: '铜鼓县'}, {
  admin_code: '360105',
  city_code: '175',
  id: '05',
  value: '湾里区'
}, {admin_code: '360828', city_code: '283', id: '28', value: '万安县'}, {
  admin_code: '361129',
  city_code: '216',
  id: '29',
  value: '万年县'
}, {admin_code: '360922', city_code: '184', id: '22', value: '万载县'}, {
  admin_code: '360423',
  city_code: '135',
  id: '23',
  value: '武宁县'
}, {admin_code: '361130', city_code: '216', id: '30', value: '婺源县'}, {
  admin_code: '360103',
  city_code: '175',
  id: '03',
  value: '西湖区'
}, {admin_code: '360823', city_code: '283', id: '23', value: '峡江县'}, {
  admin_code: '360313',
  city_code: '82',
  id: '13',
  value: '湘东区'
}, {admin_code: '360824', city_code: '283', id: '24', value: '新干县'}, {
  admin_code: '360112',
  city_code: '175',
  id: '12',
  value: '新建区'
}, {admin_code: '360722', city_code: '41', id: '22', value: '信丰县'}, {
  admin_code: '361102',
  city_code: '216',
  id: '02',
  value: '信州区'
}, {admin_code: '360732', city_code: '41', id: '32', value: '兴国县'}, {
  admin_code: '360483',
  city_code: '135',
  id: '83',
  value: '庐山市'
}, {admin_code: '360424', city_code: '135', id: '24', value: '修水县'}, {
  admin_code: '360734',
  city_code: '41',
  id: '34',
  value: '寻乌县'
}, {admin_code: '360403', city_code: '135', id: '03', value: '浔阳区'}, {
  admin_code: '360924',
  city_code: '184',
  id: '24',
  value: '宜丰县'
}, {admin_code: '361026', city_code: '219', id: '26', value: '宜黄县'}, {
  admin_code: '361126',
  city_code: '216',
  id: '26',
  value: '弋阳县'
}, {admin_code: '360825', city_code: '283', id: '25', value: '永丰县'}, {
  admin_code: '360830',
  city_code: '283',
  id: '30',
  value: '永新县'
}, {admin_code: '360425', city_code: '135', id: '25', value: '永修县'}, {
  admin_code: '360502',
  city_code: '185',
  id: '02',
  value: '渝水区'
}, {admin_code: '360731', city_code: '41', id: '31', value: '于都县'}, {
  admin_code: '361127',
  city_code: '216',
  id: '27',
  value: '余干县'
}, {admin_code: '360603', city_code: '89', id: '22', value: '余江区'}, {
  admin_code: '361123',
  city_code: '216',
  id: '23',
  value: '玉山县'
}, {admin_code: '360902', city_code: '184', id: '02', value: '袁州区'}, {
  admin_code: '360602',
  city_code: '89',
  id: '02',
  value: '月湖区'
}, {admin_code: '360702', city_code: '41', id: '02', value: '章贡区'}, {
  admin_code: '360982',
  city_code: '184',
  id: '82',
  value: '樟树市'
}, {admin_code: '360203', city_code: '90', id: '03', value: '珠山区'}, {
  admin_code: '361028',
  city_code: '219',
  id: '28',
  value: '资溪县'
}, {admin_code: '150103', city_code: '323', id: '03', value: '回民区'}, {
  admin_code: '150102',
  city_code: '323',
  id: '02',
  value: '新城区'
}, {admin_code: '150104', city_code: '323', id: '04', value: '玉泉区'}, {
  admin_code: '150105',
  city_code: '323',
  id: '05',
  value: '赛罕区'
}, {admin_code: '150122', city_code: '323', id: '22', value: '托克托县'}, {
  admin_code: '150125',
  city_code: '323',
  id: '25',
  value: '武川县'
}, {admin_code: '150123', city_code: '323', id: '23', value: '和林格尔县'}, {
  admin_code: '150124',
  city_code: '323',
  id: '24',
  value: '清水河县'
}, {admin_code: '150121', city_code: '323', id: '21', value: '土默特左旗'}, {
  admin_code: '150203',
  city_code: '129',
  id: '03',
  value: '昆都仑区'
}, {admin_code: '150202', city_code: '129', id: '02', value: '东河区'}, {
  admin_code: '150204',
  city_code: '129',
  id: '04',
  value: '青山区'
}, {admin_code: '150205', city_code: '129', id: '05', value: '石拐区'}, {
  admin_code: '150206',
  city_code: '129',
  id: '06',
  value: '白云鄂博矿区'
}, {admin_code: '150207', city_code: '129', id: '07', value: '九原区'}, {
  admin_code: '150222',
  city_code: '129',
  id: '22',
  value: '固阳县'
}, {admin_code: '150221', city_code: '129', id: '21', value: '土默特右旗'}, {
  admin_code: '150223',
  city_code: '129',
  id: '23',
  value: '达尔罕茂明安联合旗'
}, {admin_code: '150602', city_code: '245', id: '02', value: '东胜区'}, {
  admin_code: '150621',
  city_code: '245',
  id: '21',
  value: '达拉特旗'
}, {admin_code: '150622', city_code: '245', id: '22', value: '准格尔旗'}, {
  admin_code: '150623',
  city_code: '245',
  id: '23',
  value: '鄂托克前旗'
}, {admin_code: '150624', city_code: '245', id: '24', value: '鄂托克旗'}, {
  admin_code: '150625',
  city_code: '245',
  id: '25',
  value: '杭锦旗'
}, {admin_code: '150626', city_code: '245', id: '26', value: '乌审旗'}, {
  admin_code: '150627',
  city_code: '245',
  id: '27',
  value: '伊金霍洛旗'
}, {admin_code: '152502', city_code: '211', id: '02', value: '锡林浩特市'}, {
  admin_code: '152501',
  city_code: '211',
  id: '01',
  value: '二连浩特市'
}, {admin_code: '152531', city_code: '211', id: '31', value: '多伦县'}, {
  admin_code: '152522',
  city_code: '211',
  id: '22',
  value: '阿巴嘎旗'
}, {admin_code: '152523', city_code: '211', id: '23', value: '苏尼特左旗'}, {
  admin_code: '152524',
  city_code: '211',
  id: '24',
  value: '苏尼特右旗'
}, {admin_code: '152525', city_code: '211', id: '25', value: '东乌珠穆沁旗'}, {
  admin_code: '152526',
  city_code: '211',
  id: '26',
  value: '西乌珠穆沁旗'
}, {admin_code: '152527', city_code: '211', id: '27', value: '太仆寺旗'}, {
  admin_code: '152528',
  city_code: '211',
  id: '28',
  value: '镶黄旗'
}, {admin_code: '152529', city_code: '211', id: '29', value: '正镶白旗'}, {
  admin_code: '152530',
  city_code: '211',
  id: '30',
  value: '正蓝旗'
}, {admin_code: '150902', city_code: '64', id: '02', value: '集宁区'}, {
  admin_code: '150981',
  city_code: '64',
  id: '81',
  value: '丰镇市'
}, {admin_code: '150921', city_code: '64', id: '21', value: '卓资县'}, {
  admin_code: '150922',
  city_code: '64',
  id: '22',
  value: '化德县'
}, {admin_code: '150923', city_code: '64', id: '23', value: '商都县'}, {
  admin_code: '150924',
  city_code: '64',
  id: '24',
  value: '兴和县'
}, {admin_code: '150925', city_code: '64', id: '25', value: '凉城县'}, {
  admin_code: '150926',
  city_code: '64',
  id: '26',
  value: '察哈尔右翼前旗'
}, {admin_code: '150927', city_code: '64', id: '27', value: '察哈尔右翼中旗'}, {
  admin_code: '150928',
  city_code: '64',
  id: '28',
  value: '察哈尔右翼后旗'
}, {admin_code: '150929', city_code: '64', id: '29', value: '四子王旗'}, {
  admin_code: '150802',
  city_code: '14',
  id: '02',
  value: '临河区'
}, {admin_code: '150821', city_code: '14', id: '21', value: '五原县'}, {
  admin_code: '150822',
  city_code: '14',
  id: '22',
  value: '磴口县'
}, {admin_code: '150823', city_code: '14', id: '23', value: '乌拉特前旗'}, {
  admin_code: '150824',
  city_code: '14',
  id: '24',
  value: '乌拉特中旗'
}, {admin_code: '150825', city_code: '14', id: '25', value: '乌拉特后旗'}, {
  admin_code: '150826',
  city_code: '14',
  id: '26',
  value: '杭锦后旗'
}, {admin_code: '451002', city_code: '302', id: '02', value: '右江区'}, {
  admin_code: '451024',
  city_code: '302',
  id: '24',
  value: '德保县'
}, {admin_code: '451081', city_code: '302', id: '81', value: '靖西市'}, {
  admin_code: '451028',
  city_code: '302',
  id: '28',
  value: '乐业县'
}, {admin_code: '451027', city_code: '302', id: '27', value: '凌云县'}, {
  admin_code: '451031',
  city_code: '302',
  id: '31',
  value: '隆林各族自治县'
}, {admin_code: '451026', city_code: '302', id: '26', value: '那坡县'}, {
  admin_code: '451023',
  city_code: '302',
  id: '23',
  value: '平果县'
}, {admin_code: '451022', city_code: '302', id: '22', value: '田东县'}, {
  admin_code: '451029',
  city_code: '302',
  id: '29',
  value: '田林县'
}, {admin_code: '451021', city_code: '302', id: '21', value: '田阳县'}, {
  admin_code: '451030',
  city_code: '302',
  id: '30',
  value: '西林县'
}, {admin_code: '450502', city_code: '37', id: '02', value: '海城区'}, {
  admin_code: '450521',
  city_code: '37',
  id: '21',
  value: '合浦县'
}, {admin_code: '450981', city_code: '127', id: '81', value: '北流市'}, {
  admin_code: '450681',
  city_code: '214',
  id: '81',
  value: '东兴市'
}, {admin_code: '450602', city_code: '214', id: '02', value: '港口区'}, {
  admin_code: '450621',
  city_code: '214',
  id: '21',
  value: '上思县'
}, {admin_code: '450802', city_code: '215', id: '02', value: '港北区'}, {
  admin_code: '450821',
  city_code: '215',
  id: '21',
  value: '平南县'
}, {admin_code: '450332', city_code: '100', id: '32', value: '恭城瑶族自治县'}, {
  admin_code: '450327',
  city_code: '100',
  id: '27',
  value: '灌阳县'
}, {admin_code: '450304', city_code: '100', id: '04', value: '象山区'}, {
  admin_code: '450381',
  city_code: '100',
  id: '31',
  value: '荔浦市'
}, {admin_code: '450312', city_code: '100', id: '12', value: '临桂区'}, {
  admin_code: '450323',
  city_code: '100',
  id: '23',
  value: '灵川县'
}, {admin_code: '450328', city_code: '100', id: '28', value: '龙胜各族自治县'}, {
  admin_code: '450330',
  city_code: '100',
  id: '30',
  value: '平乐县'
}, {admin_code: '450324', city_code: '100', id: '24', value: '全州县'}, {
  admin_code: '450325',
  city_code: '100',
  id: '25',
  value: '兴安县'
}, {admin_code: '450321', city_code: '100', id: '21', value: '阳朔县'}, {
  admin_code: '450326',
  city_code: '100',
  id: '26',
  value: '永福县'
}, {admin_code: '450329', city_code: '100', id: '29', value: '资源县'}, {
  admin_code: '450881',
  city_code: '215',
  id: '81',
  value: '桂平市'
}, {admin_code: '451381', city_code: '200', id: '81', value: '合山市'}, {
  admin_code: '451227',
  city_code: '12',
  id: '27',
  value: '巴马瑶族自治县'
}, {admin_code: '451229', city_code: '12', id: '29', value: '大化瑶族自治县'}, {
  admin_code: '451224',
  city_code: '12',
  id: '24',
  value: '东兰县'
}, {admin_code: '451228', city_code: '12', id: '28', value: '都安瑶族自治县'}, {
  admin_code: '451223',
  city_code: '12',
  id: '23',
  value: '凤山县'
}, {admin_code: '451202', city_code: '12', id: '02', value: '金城江区'}, {
  admin_code: '451226',
  city_code: '12',
  id: '26',
  value: '环江毛南族自治县'
}, {admin_code: '451225', city_code: '12', id: '25', value: '罗城仫佬族自治县'}, {
  admin_code: '451221',
  city_code: '12',
  id: '21',
  value: '南丹县'
}, {admin_code: '451222', city_code: '12', id: '22', value: '天峨县'}, {
  admin_code: '451203',
  city_code: '12',
  id: '03',
  value: '宜州区'
}, {admin_code: '451123', city_code: '199', id: '23', value: '富川瑶族自治县'}, {
  admin_code: '451102',
  city_code: '199',
  id: '02',
  value: '八步区'
}, {admin_code: '451121', city_code: '199', id: '21', value: '昭平县'}, {
  admin_code: '451122',
  city_code: '199',
  id: '22',
  value: '钟山县'
}, {admin_code: '451324', city_code: '200', id: '24', value: '金秀瑶族自治县'}, {
  admin_code: '451302',
  city_code: '200',
  id: '02',
  value: '兴宾区'
}, {admin_code: '450222', city_code: '13', id: '22', value: '柳城县'}, {
  admin_code: '450206',
  city_code: '13',
  id: '06',
  value: '柳江区'
}, {admin_code: '450202', city_code: '13', id: '02', value: '城中区'}, {
  admin_code: '450223',
  city_code: '13',
  id: '23',
  value: '鹿寨县'
}, {admin_code: '450225', city_code: '13', id: '25', value: '融水苗族自治县'}, {
  admin_code: '450226',
  city_code: '13',
  id: '26',
  value: '三江侗族自治县'
}, {admin_code: '451323', city_code: '200', id: '23', value: '武宣县'}, {
  admin_code: '451322',
  city_code: '200',
  id: '22',
  value: '象州县'
}, {admin_code: '451321', city_code: '200', id: '21', value: '忻城县'}, {
  admin_code: '450107',
  city_code: '341',
  id: '07',
  value: '西乡塘区'
}, {admin_code: '450105', city_code: '341', id: '05', value: '江南区'}, {
  admin_code: '450103',
  city_code: '341',
  id: '03',
  value: '青秀区'
}, {admin_code: '450102', city_code: '341', id: '02', value: '兴宁区'}, {
  admin_code: '450108',
  city_code: '341',
  id: '08',
  value: '良庆区'
}, {admin_code: '450126', city_code: '341', id: '26', value: '宾阳县'}, {
  admin_code: '451402',
  city_code: '187',
  id: '02',
  value: '江州区'
}, {admin_code: '451424', city_code: '187', id: '24', value: '大新县'}, {
  admin_code: '451421',
  city_code: '187',
  id: '21',
  value: '扶绥县'
}, {admin_code: '450127', city_code: '341', id: '27', value: '横县'}, {
  admin_code: '450123',
  city_code: '341',
  id: '23',
  value: '隆安县'
}, {admin_code: '450124', city_code: '341', id: '24', value: '马山县'}, {
  admin_code: '451422',
  city_code: '187',
  id: '22',
  value: '宁明县'
}, {admin_code: '450224', city_code: '13', id: '24', value: '融安县'}, {
  admin_code: '450125',
  city_code: '341',
  id: '25',
  value: '上林县'
}, {admin_code: '451425', city_code: '187', id: '25', value: '天等县'}, {
  admin_code: '450110',
  city_code: '341',
  id: '10',
  value: '武鸣区'
}, {admin_code: '450109', city_code: '341', id: '09', value: '邕宁区'}, {
  admin_code: '451423',
  city_code: '187',
  id: '23',
  value: '龙州县'
}, {admin_code: '451481', city_code: '187', id: '81', value: '凭祥市'}, {
  admin_code: '450721',
  city_code: '134',
  id: '21',
  value: '灵山县'
}, {admin_code: '450722', city_code: '134', id: '22', value: '浦北县'}, {
  admin_code: '450702',
  city_code: '134',
  id: '02',
  value: '钦南区'
}, {admin_code: '450421', city_code: '88', id: '21', value: '苍梧县'}, {
  admin_code: '450423',
  city_code: '88',
  id: '23',
  value: '蒙山县'
}, {admin_code: '450403', city_code: '88', id: '03', value: '万秀区'}, {
  admin_code: '450481',
  city_code: '88',
  id: '81',
  value: '岑溪市'
}, {admin_code: '450923', city_code: '127', id: '23', value: '博白县'}, {
  admin_code: '450922',
  city_code: '127',
  id: '22',
  value: '陆川县'
}, {admin_code: '450921', city_code: '127', id: '21', value: '容县'}, {
  admin_code: '450422',
  city_code: '88',
  id: '22',
  value: '藤县'
}, {admin_code: '450924', city_code: '127', id: '24', value: '兴业县'}, {
  admin_code: '450902',
  city_code: '127',
  id: '02',
  value: '玉州区'
}, {admin_code: '370203', city_code: '336', id: '03', value: '市北区'}, {
  admin_code: '370202',
  city_code: '336',
  id: '02',
  value: '市南区'
}, {admin_code: '370212', city_code: '336', id: '12', value: '崂山区'}, {
  admin_code: '370211',
  city_code: '336',
  id: '11',
  value: '黄岛区'
}, {admin_code: '370213', city_code: '336', id: '13', value: '李沧区'}, {
  admin_code: '370214',
  city_code: '336',
  id: '14',
  value: '城阳区'
}, {admin_code: '370705', city_code: '295', id: '05', value: '奎文区'}, {
  admin_code: '370781',
  city_code: '295',
  id: '81',
  value: '青州市'
}, {admin_code: '370282', city_code: '336', id: '82', value: '即墨市'}, {
  admin_code: '371102',
  city_code: '178',
  id: '02',
  value: '东港区'
}, {admin_code: '370785', city_code: '295', id: '85', value: '高密市'}, {
  admin_code: '370283',
  city_code: '336',
  id: '83',
  value: '平度市'
}, {admin_code: '370281', city_code: '336', id: '81', value: '胶州市'}, {
  admin_code: '370285',
  city_code: '336',
  id: '85',
  value: '莱西市'
}, {admin_code: '370782', city_code: '295', id: '82', value: '诸城市'}, {
  admin_code: '371122',
  city_code: '178',
  id: '22',
  value: '莒县'
}, {admin_code: '370725', city_code: '295', id: '25', value: '昌乐县'}, {
  admin_code: '371121',
  city_code: '178',
  id: '21',
  value: '五莲县'
}, {admin_code: '370784', city_code: '295', id: '84', value: '安丘市'}, {
  admin_code: '370783',
  city_code: '295',
  id: '83',
  value: '寿光市'
}, {admin_code: '370724', city_code: '295', id: '24', value: '临朐县'}, {
  admin_code: '370786',
  city_code: '295',
  id: '86',
  value: '昌邑市'
}, {admin_code: '350102', city_code: '179', id: '02', value: '鼓楼区'}, {
  admin_code: '350103',
  city_code: '179',
  id: '03',
  value: '台江区'
}, {admin_code: '350104', city_code: '179', id: '04', value: '仓山区'}, {
  admin_code: '350111',
  city_code: '179',
  id: '11',
  value: '晋安区'
}, {admin_code: '350105', city_code: '179', id: '05', value: '马尾区'}, {
  admin_code: '350181',
  city_code: '179',
  id: '81',
  value: '福清市'
}, {admin_code: '350121', city_code: '179', id: '21', value: '闽侯县'}, {
  admin_code: '350128',
  city_code: '179',
  id: '28',
  value: '平潭县'
}, {admin_code: '350122', city_code: '179', id: '22', value: '连江县'}, {
  admin_code: '350123',
  city_code: '179',
  id: '23',
  value: '罗源县'
}, {admin_code: '350124', city_code: '179', id: '24', value: '闽清县'}, {
  admin_code: '350125',
  city_code: '179',
  id: '25',
  value: '永泰县'
}, {admin_code: '350112', city_code: '179', id: '82', value: '长乐区'}, {
  admin_code: '350902',
  city_code: '86',
  id: '02',
  value: '蕉城区'
}, {admin_code: '350922', city_code: '86', id: '22', value: '古田县'}, {
  admin_code: '350921',
  city_code: '86',
  id: '21',
  value: '霞浦县'
}, {admin_code: '350982', city_code: '86', id: '82', value: '福鼎市'}, {
  admin_code: '350926',
  city_code: '86',
  id: '26',
  value: '柘荣县'
}, {admin_code: '350925', city_code: '86', id: '25', value: '周宁县'}, {
  admin_code: '350924',
  city_code: '86',
  id: '24',
  value: '寿宁县'
}, {admin_code: '350923', city_code: '86', id: '23', value: '屏南县'}, {
  admin_code: '350981',
  city_code: '86',
  id: '81',
  value: '福安市'
}, {admin_code: '350302', city_code: '256', id: '02', value: '城厢区'}, {
  admin_code: '350305',
  city_code: '256',
  id: '05',
  value: '秀屿区'
}, {admin_code: '350304', city_code: '256', id: '04', value: '荔城区'}, {
  admin_code: '350322',
  city_code: '256',
  id: '22',
  value: '仙游县'
}, {admin_code: '350303', city_code: '256', id: '03', value: '涵江区'}, {
  admin_code: '350402',
  city_code: '287',
  id: '02',
  value: '梅列区'
}, {admin_code: '350403', city_code: '287', id: '03', value: '三元区'}, {
  admin_code: '350481',
  city_code: '287',
  id: '81',
  value: '永安市'
}, {admin_code: '350428', city_code: '287', id: '28', value: '将乐县'}, {
  admin_code: '350430',
  city_code: '287',
  id: '30',
  value: '建宁县'
}, {admin_code: '350426', city_code: '287', id: '26', value: '尤溪县'}, {
  admin_code: '350424',
  city_code: '287',
  id: '24',
  value: '宁化县'
}, {admin_code: '350427', city_code: '287', id: '27', value: '沙县'}, {
  admin_code: '350425',
  city_code: '287',
  id: '25',
  value: '大田县'
}, {admin_code: '350429', city_code: '287', id: '29', value: '泰宁县'}, {
  admin_code: '350421',
  city_code: '287',
  id: '21',
  value: '明溪县'
}, {admin_code: '350423', city_code: '287', id: '23', value: '清流县'}, {
  admin_code: '350702',
  city_code: '163',
  id: '02',
  value: '延平区'
}, {admin_code: '350781', city_code: '163', id: '81', value: '邵武市'}, {
  admin_code: '350722',
  city_code: '163',
  id: '22',
  value: '浦城县'
}, {admin_code: '350703', city_code: '163', id: '03', value: '建阳区'}, {
  admin_code: '350782',
  city_code: '163',
  id: '82',
  value: '武夷山市'
}, {admin_code: '350721', city_code: '163', id: '21', value: '顺昌县'}, {
  admin_code: '350725',
  city_code: '163',
  id: '25',
  value: '政和县'
}, {admin_code: '350783', city_code: '163', id: '83', value: '建瓯市'}, {
  admin_code: '350723',
  city_code: '163',
  id: '23',
  value: '光泽县'
}, {admin_code: '350724', city_code: '163', id: '24', value: '松溪县'}, {
  admin_code: '310101',
  city_code: '240',
  id: '01',
  value: '黄浦区'
}, {admin_code: '310104', city_code: '240', id: '04', value: '徐汇区'}, {
  admin_code: '310105',
  city_code: '240',
  id: '05',
  value: '长宁区'
}, {admin_code: '310106', city_code: '240', id: '06', value: '静安区'}, {
  admin_code: '310107',
  city_code: '240',
  id: '07',
  value: '普陀区'
}, {admin_code: '310108', city_code: '239', id: '08', value: '闸北区'}, {
  admin_code: '310109',
  city_code: '240',
  id: '09',
  value: '虹口区'
}, {admin_code: '310110', city_code: '240', id: '10', value: '杨浦区'}, {
  admin_code: '310112',
  city_code: '240',
  id: '12',
  value: '闵行区'
}, {admin_code: '310113', city_code: '240', id: '13', value: '宝山区'}, {
  admin_code: '310114',
  city_code: '240',
  id: '14',
  value: '嘉定区'
}, {admin_code: '310115', city_code: '240', id: '15', value: '浦东新区'}, {
  admin_code: '310116',
  city_code: '240',
  id: '16',
  value: '金山区'
}, {admin_code: '310117', city_code: '240', id: '17', value: '松江区'}, {
  admin_code: '310118',
  city_code: '240',
  id: '18',
  value: '青浦区'
}, {admin_code: '310120', city_code: '240', id: '20', value: '奉贤区'}, {
  admin_code: '310151',
  city_code: '240',
  id: '51',
  value: '崇明区'
}, {admin_code: '130102', city_code: '241', id: '02', value: '长安区'}, {
  admin_code: '130104',
  city_code: '241',
  id: '04',
  value: '桥西区'
}, {admin_code: '130105', city_code: '241', id: '05', value: '新华区'}, {
  admin_code: '130108',
  city_code: '241',
  id: '08',
  value: '裕华区'
}, {admin_code: '130107', city_code: '241', id: '07', value: '井陉矿区'}, {
  admin_code: '130181',
  city_code: '241',
  id: '81',
  value: '辛集市'
}, {admin_code: '130109', city_code: '241', id: '09', value: '藁城区'}, {
  admin_code: '130183',
  city_code: '241',
  id: '83',
  value: '晋州市'
}, {admin_code: '130184', city_code: '241', id: '84', value: '新乐市'}, {
  admin_code: '130110',
  city_code: '241',
  id: '10',
  value: '鹿泉区'
}, {admin_code: '130121', city_code: '241', id: '21', value: '井陉县'}, {
  admin_code: '130123',
  city_code: '241',
  id: '23',
  value: '正定县'
}, {admin_code: '130111', city_code: '241', id: '11', value: '栾城区'}, {
  admin_code: '130125',
  city_code: '241',
  id: '25',
  value: '行唐县'
}, {admin_code: '130126', city_code: '241', id: '26', value: '灵寿县'}, {
  admin_code: '130127',
  city_code: '241',
  id: '27',
  value: '高邑县'
}, {admin_code: '130128', city_code: '241', id: '28', value: '深泽县'}, {
  admin_code: '130129',
  city_code: '241',
  id: '29',
  value: '赞皇县'
}, {admin_code: '130130', city_code: '241', id: '30', value: '无极县'}, {
  admin_code: '130131',
  city_code: '241',
  id: '31',
  value: '平山县'
}, {admin_code: '130132', city_code: '241', id: '32', value: '元氏县'}, {
  admin_code: '130133',
  city_code: '241',
  id: '33',
  value: '赵县'
}, {admin_code: '130602', city_code: '172', id: '02', value: '竞秀区'}, {
  admin_code: '130606',
  city_code: '172',
  id: '06',
  value: '莲池区'
}, {admin_code: '130604', city_code: '171', id: '04', value: '南市区'}, {
  admin_code: '130682',
  city_code: '172',
  id: '82',
  value: '定州市'
}, {admin_code: '130681', city_code: '172', id: '81', value: '涿州市'}, {
  admin_code: '130683',
  city_code: '172',
  id: '83',
  value: '安国市'
}, {admin_code: '130684', city_code: '172', id: '84', value: '高碑店市'}, {
  admin_code: '130607',
  city_code: '172',
  id: '07',
  value: '满城区'
}, {admin_code: '130608', city_code: '172', id: '08', value: '清苑区'}, {
  admin_code: '130633',
  city_code: '172',
  id: '33',
  value: '易县'
}, {admin_code: '130609', city_code: '172', id: '09', value: '徐水区'}, {
  admin_code: '130630',
  city_code: '172',
  id: '30',
  value: '涞源县'
}, {admin_code: '130626', city_code: '172', id: '26', value: '定兴县'}, {
  admin_code: '130636',
  city_code: '172',
  id: '36',
  value: '顺平县'
}, {admin_code: '130627', city_code: '172', id: '27', value: '唐县'}, {
  admin_code: '130631',
  city_code: '172',
  id: '31',
  value: '望都县'
}, {admin_code: '130623', city_code: '172', id: '23', value: '涞水县'}, {
  admin_code: '130628',
  city_code: '172',
  id: '28',
  value: '高阳县'
}, {admin_code: '130632', city_code: '172', id: '32', value: '安新县'}, {
  admin_code: '130638',
  city_code: '172',
  id: '38',
  value: '雄县'
}, {admin_code: '130629', city_code: '172', id: '29', value: '容城县'}, {
  admin_code: '130634',
  city_code: '172',
  id: '34',
  value: '曲阳县'
}, {admin_code: '130624', city_code: '172', id: '24', value: '阜平县'}, {
  admin_code: '130637',
  city_code: '172',
  id: '37',
  value: '博野县'
}, {admin_code: '130635', city_code: '172', id: '35', value: '蠡县'}, {
  admin_code: '131102',
  city_code: '32',
  id: '02',
  value: '桃城区'
}, {admin_code: '131103', city_code: '32', id: '03', value: '冀州区'}, {
  admin_code: '131182',
  city_code: '32',
  id: '82',
  value: '深州市'
}, {admin_code: '131121', city_code: '32', id: '21', value: '枣强县'}, {
  admin_code: '131122',
  city_code: '32',
  id: '22',
  value: '武邑县'
}, {admin_code: '131123', city_code: '32', id: '23', value: '武强县'}, {
  admin_code: '131124',
  city_code: '32',
  id: '24',
  value: '饶阳县'
}, {admin_code: '131125', city_code: '32', id: '25', value: '安平县'}, {
  admin_code: '131126',
  city_code: '32',
  id: '26',
  value: '故城县'
}, {admin_code: '131127', city_code: '32', id: '27', value: '景县'}, {
  admin_code: '131128',
  city_code: '32',
  id: '28',
  value: '阜城县'
}, {admin_code: '130502', city_code: '122', id: '02', value: '桥东区'}, {
  admin_code: '130503',
  city_code: '122',
  id: '03',
  value: '桥西区'
}, {admin_code: '130581', city_code: '122', id: '81', value: '南宫市'}, {
  admin_code: '130582',
  city_code: '122',
  id: '82',
  value: '沙河市'
}, {admin_code: '130521', city_code: '122', id: '21', value: '邢台县'}, {
  admin_code: '130522',
  city_code: '122',
  id: '22',
  value: '临城县'
}, {admin_code: '130523', city_code: '122', id: '23', value: '内丘县'}, {
  admin_code: '130524',
  city_code: '122',
  id: '24',
  value: '柏乡县'
}, {admin_code: '130525', city_code: '122', id: '25', value: '隆尧县'}, {
  admin_code: '130526',
  city_code: '122',
  id: '26',
  value: '任县'
}, {admin_code: '130527', city_code: '122', id: '27', value: '南和县'}, {
  admin_code: '130528',
  city_code: '122',
  id: '28',
  value: '宁晋县'
}, {admin_code: '130529', city_code: '122', id: '29', value: '巨鹿县'}, {
  admin_code: '130530',
  city_code: '122',
  id: '30',
  value: '新河县'
}, {admin_code: '130531', city_code: '122', id: '31', value: '广宗县'}, {
  admin_code: '130532',
  city_code: '122',
  id: '32',
  value: '平乡县'
}, {admin_code: '130533', city_code: '122', id: '33', value: '威县'}, {
  admin_code: '130534',
  city_code: '122',
  id: '34',
  value: '清河县'
}, {admin_code: '130535', city_code: '122', id: '35', value: '临西县'}, {
  admin_code: '130403',
  city_code: '334',
  id: '03',
  value: '丛台区'
}, {admin_code: '130402', city_code: '334', id: '02', value: '邯山区'}, {
  admin_code: '130404',
  city_code: '334',
  id: '04',
  value: '复兴区'
}, {admin_code: '130406', city_code: '334', id: '06', value: '峰峰矿区'}, {
  admin_code: '130481',
  city_code: '334',
  id: '81',
  value: '武安市'
}, {admin_code: '130421', city_code: '335', id: '21', value: '邯郸县'}, {
  admin_code: '130423',
  city_code: '334',
  id: '23',
  value: '临漳县'
}, {admin_code: '130424', city_code: '334', id: '24', value: '成安县'}, {
  admin_code: '130425',
  city_code: '334',
  id: '25',
  value: '大名县'
}, {admin_code: '130426', city_code: '334', id: '26', value: '涉县'}, {
  admin_code: '130427',
  city_code: '334',
  id: '27',
  value: '磁县'
}, {admin_code: '130407', city_code: '334', id: '07', value: '肥乡区'}, {
  admin_code: '130408',
  city_code: '334',
  id: '08',
  value: '永年区'
}, {admin_code: '130430', city_code: '334', id: '30', value: '邱县'}, {
  admin_code: '130431',
  city_code: '334',
  id: '31',
  value: '鸡泽县'
}, {admin_code: '130432', city_code: '334', id: '32', value: '广平县'}, {
  admin_code: '130433',
  city_code: '334',
  id: '33',
  value: '馆陶县'
}, {admin_code: '130434', city_code: '334', id: '34', value: '魏县'}, {
  admin_code: '130435',
  city_code: '334',
  id: '35',
  value: '曲周县'
}, {admin_code: '210103', city_code: '274', id: '03', value: '沈河区'}, {
  admin_code: '210102',
  city_code: '274',
  id: '02',
  value: '和平区'
}, {admin_code: '210104', city_code: '274', id: '04', value: '大东区'}, {
  admin_code: '210105',
  city_code: '274',
  id: '05',
  value: '皇姑区'
}, {admin_code: '210106', city_code: '274', id: '06', value: '铁西区'}, {
  admin_code: '210111',
  city_code: '274',
  id: '11',
  value: '苏家屯区'
}, {admin_code: '210112', city_code: '274', id: '12', value: '浑南区'}, {
  admin_code: '210113',
  city_code: '274',
  id: '13',
  value: '沈北新区'
}, {admin_code: '210114', city_code: '274', id: '14', value: '于洪区'}, {
  admin_code: '210181',
  city_code: '274',
  id: '81',
  value: '新民市'
}, {admin_code: '210115', city_code: '274', id: '15', value: '辽中区'}, {
  admin_code: '210123',
  city_code: '274',
  id: '23',
  value: '康平县'
}, {admin_code: '210124', city_code: '274', id: '24', value: '法库县'}, {
  admin_code: '211202',
  city_code: '182',
  id: '02',
  value: '银州区'
}, {admin_code: '211204', city_code: '182', id: '04', value: '清河区'}, {
  admin_code: '211281',
  city_code: '182',
  id: '81',
  value: '调兵山市'
}, {admin_code: '211282', city_code: '182', id: '82', value: '开原市'}, {
  admin_code: '211221',
  city_code: '182',
  id: '21',
  value: '铁岭县'
}, {admin_code: '211223', city_code: '182', id: '23', value: '西丰县'}, {
  admin_code: '211224',
  city_code: '182',
  id: '24',
  value: '昌图县'
}, {admin_code: '210402', city_code: '76', id: '02', value: '新抚区'}, {
  admin_code: '210403',
  city_code: '76',
  id: '03',
  value: '东洲区'
}, {admin_code: '210404', city_code: '76', id: '04', value: '望花区'}, {
  admin_code: '210411',
  city_code: '76',
  id: '11',
  value: '顺城区'
}, {admin_code: '210421', city_code: '76', id: '21', value: '抚顺县'}, {
  admin_code: '210422',
  city_code: '76',
  id: '22',
  value: '新宾满族自治县'
}, {admin_code: '210423', city_code: '76', id: '23', value: '清原满族自治县'}, {
  admin_code: '210502',
  city_code: '132',
  id: '02',
  value: '平山区'
}, {admin_code: '210503', city_code: '132', id: '03', value: '溪湖区'}, {
  admin_code: '210504',
  city_code: '132',
  id: '04',
  value: '明山区'
}, {admin_code: '210505', city_code: '132', id: '05', value: '南芬区'}, {
  admin_code: '210521',
  city_code: '132',
  id: '21',
  value: '本溪满族自治县'
}, {admin_code: '210522', city_code: '132', id: '22', value: '桓仁满族自治县'}, {
  admin_code: '211002',
  city_code: '212',
  id: '02',
  value: '白塔区'
}, {admin_code: '211003', city_code: '212', id: '03', value: '文圣区'}, {
  admin_code: '211005',
  city_code: '212',
  id: '05',
  value: '弓长岭区'
}, {admin_code: '211011', city_code: '212', id: '11', value: '太子河区'}, {
  admin_code: '211021',
  city_code: '212',
  id: '21',
  value: '辽阳县'
}, {admin_code: '211004', city_code: '212', id: '04', value: '宏伟区'}, {
  admin_code: '211081',
  city_code: '212',
  id: '81',
  value: '灯塔市'
}, {admin_code: '210302', city_code: '206', id: '02', value: '铁东区'}, {
  admin_code: '210303',
  city_code: '206',
  id: '03',
  value: '铁西区'
}, {admin_code: '210304', city_code: '206', id: '04', value: '立山区'}, {
  admin_code: '210311',
  city_code: '206',
  id: '11',
  value: '千山区'
}, {admin_code: '210381', city_code: '206', id: '81', value: '海城市'}, {
  admin_code: '210321',
  city_code: '206',
  id: '21',
  value: '台安县'
}, {admin_code: '210323', city_code: '206', id: '23', value: '岫岩满族自治县'}, {
  admin_code: '150502',
  city_code: '332',
  id: '02',
  value: '科尔沁区'
}, {admin_code: '150581', city_code: '332', id: '81', value: '霍林郭勒市'}, {
  admin_code: '150523',
  city_code: '332',
  id: '23',
  value: '开鲁县'
}, {admin_code: '150524', city_code: '332', id: '24', value: '库伦旗'}, {
  admin_code: '150525',
  city_code: '332',
  id: '25',
  value: '奈曼旗'
}, {admin_code: '150526', city_code: '332', id: '26', value: '扎鲁特旗'}, {
  admin_code: '150521',
  city_code: '332',
  id: '21',
  value: '科尔沁左翼中旗'
}, {admin_code: '150522', city_code: '332', id: '22', value: '科尔沁左翼后旗'}, {
  admin_code: '440303',
  city_code: '290',
  id: '03',
  value: '罗湖区'
}, {admin_code: '440308', city_code: '290', id: '08', value: '盐田区'}, {
  admin_code: '440304',
  city_code: '290',
  id: '04',
  value: '福田区'
}, {admin_code: '440305', city_code: '290', id: '05', value: '南山区'}, {
  admin_code: '440307',
  city_code: '290',
  id: '07',
  value: '龙岗区'
}, {admin_code: '440306', city_code: '290', id: '06', value: '宝安区'}, {
  admin_code: '120101',
  city_code: '291',
  id: '01',
  value: '和平区'
}, {admin_code: '120102', city_code: '291', id: '02', value: '河东区'}, {
  admin_code: '120103',
  city_code: '291',
  id: '03',
  value: '河西区'
}, {admin_code: '120104', city_code: '291', id: '04', value: '南开区'}, {
  admin_code: '120105',
  city_code: '291',
  id: '05',
  value: '河北区'
}, {admin_code: '120106', city_code: '291', id: '06', value: '红桥区'}, {
  admin_code: '120110',
  city_code: '291',
  id: '10',
  value: '东丽区'
}, {admin_code: '120111', city_code: '291', id: '11', value: '西青区'}, {
  admin_code: '120112',
  city_code: '291',
  id: '12',
  value: '津南区'
}, {admin_code: '120113', city_code: '291', id: '13', value: '北辰区'}, {
  admin_code: '120114',
  city_code: '291',
  id: '14',
  value: '武清区'
}, {admin_code: '120115', city_code: '291', id: '15', value: '宝坻区'}, {
  admin_code: '120119',
  city_code: '291',
  id: '19',
  value: '蓟州区'
}, {admin_code: '120117', city_code: '291', id: '17', value: '宁河区'}, {
  admin_code: '120118',
  city_code: '291',
  id: '18',
  value: '静海区'
}, {admin_code: '131002', city_code: '284', id: '02', value: '安次区'}, {
  admin_code: '131003',
  city_code: '284',
  id: '03',
  value: '广阳区'
}, {admin_code: '131081', city_code: '284', id: '81', value: '霸州市'}, {
  admin_code: '131022',
  city_code: '284',
  id: '22',
  value: '固安县'
}, {admin_code: '131023', city_code: '284', id: '23', value: '永清县'}, {
  admin_code: '131024',
  city_code: '284',
  id: '24',
  value: '香河县'
}, {admin_code: '131025', city_code: '284', id: '25', value: '大城县'}, {
  admin_code: '131026',
  city_code: '284',
  id: '26',
  value: '文安县'
}, {admin_code: '131028', city_code: '284', id: '28', value: '大厂回族自治县'}, {
  admin_code: '131082',
  city_code: '284',
  id: '82',
  value: '三河市'
}, {admin_code: '130981', city_code: '165', id: '81', value: '泊头市'}, {
  admin_code: '130982',
  city_code: '165',
  id: '82',
  value: '任丘市'
}, {admin_code: '130983', city_code: '165', id: '83', value: '黄骅市'}, {
  admin_code: '130984',
  city_code: '165',
  id: '84',
  value: '河间市'
}, {admin_code: '130903', city_code: '165', id: '03', value: '运河区'}, {
  admin_code: '130922',
  city_code: '165',
  id: '22',
  value: '青县'
}, {admin_code: '130923', city_code: '165', id: '23', value: '东光县'}, {
  admin_code: '130924',
  city_code: '165',
  id: '24',
  value: '海兴县'
}, {admin_code: '130925', city_code: '165', id: '25', value: '盐山县'}, {
  admin_code: '130926',
  city_code: '165',
  id: '26',
  value: '肃宁县'
}, {admin_code: '130927', city_code: '165', id: '27', value: '南皮县'}, {
  admin_code: '130928',
  city_code: '165',
  id: '28',
  value: '吴桥县'
}, {admin_code: '130929', city_code: '165', id: '29', value: '献县'}, {
  admin_code: '130930',
  city_code: '165',
  id: '30',
  value: '孟村回族自治县'
}, {admin_code: '130203', city_code: '118', id: '03', value: '路北区'}, {
  admin_code: '130202',
  city_code: '118',
  id: '02',
  value: '路南区'
}, {admin_code: '130204', city_code: '118', id: '04', value: '古冶区'}, {
  admin_code: '130205',
  city_code: '118',
  id: '05',
  value: '开平区'
}, {admin_code: '130208', city_code: '118', id: '08', value: '丰润区'}, {
  admin_code: '130281',
  city_code: '118',
  id: '81',
  value: '遵化市'
}, {admin_code: '130283', city_code: '118', id: '83', value: '迁安市'}, {
  admin_code: '130207',
  city_code: '118',
  id: '07',
  value: '丰南区'
}, {admin_code: '130227', city_code: '118', id: '27', value: '迁西县'}, {
  admin_code: '130223',
  city_code: '118',
  id: '23',
  value: '滦县'
}, {admin_code: '130224', city_code: '118', id: '24', value: '滦南县'}, {
  admin_code: '130229',
  city_code: '118',
  id: '29',
  value: '玉田县'
}, {admin_code: '130225', city_code: '118', id: '25', value: '乐亭县'}, {
  admin_code: '130302',
  city_code: '4',
  id: '02',
  value: '海港区'
}, {admin_code: '130303', city_code: '4', id: '03', value: '山海关区'}, {
  admin_code: '130304',
  city_code: '4',
  id: '04',
  value: '北戴河区'
}, {admin_code: '130324', city_code: '4', id: '24', value: '卢龙县'}, {
  admin_code: '130321',
  city_code: '4',
  id: '21',
  value: '青龙满族自治县'
}, {admin_code: '130322', city_code: '4', id: '22', value: '昌黎县'}, {
  admin_code: '130306',
  city_code: '4',
  id: '06',
  value: '抚宁区'
}, {admin_code: '141102', city_code: '242', id: '02', value: '离石区'}, {
  admin_code: '141181',
  city_code: '242',
  id: '81',
  value: '孝义市'
}, {admin_code: '141182', city_code: '242', id: '82', value: '汾阳市'}, {
  admin_code: '141121',
  city_code: '242',
  id: '21',
  value: '文水县'
}, {admin_code: '141129', city_code: '242', id: '29', value: '中阳县'}, {
  admin_code: '141123',
  city_code: '242',
  id: '23',
  value: '兴县'
}, {admin_code: '141124', city_code: '242', id: '24', value: '临县'}, {
  admin_code: '141128',
  city_code: '242',
  id: '28',
  value: '方山县'
}, {admin_code: '141125', city_code: '242', id: '25', value: '柳林县'}, {
  admin_code: '141127',
  city_code: '242',
  id: '27',
  value: '岚县'
}, {admin_code: '141130', city_code: '242', id: '30', value: '交口县'}, {
  admin_code: '141122',
  city_code: '242',
  id: '22',
  value: '交城县'
}, {admin_code: '141126', city_code: '242', id: '26', value: '石楼县'}, {
  admin_code: '140107',
  city_code: '16',
  id: '07',
  value: '杏花岭区'
}, {admin_code: '140105', city_code: '16', id: '05', value: '小店区'}, {
  admin_code: '140106',
  city_code: '16',
  id: '06',
  value: '迎泽区'
}, {admin_code: '140108', city_code: '16', id: '08', value: '尖草坪区'}, {
  admin_code: '140109',
  city_code: '16',
  id: '09',
  value: '万柏林区'
}, {admin_code: '140110', city_code: '16', id: '10', value: '晋源区'}, {
  admin_code: '140181',
  city_code: '16',
  id: '81',
  value: '古交市'
}, {admin_code: '140121', city_code: '16', id: '21', value: '清徐县'}, {
  admin_code: '140122',
  city_code: '16',
  id: '22',
  value: '阳曲县'
}, {admin_code: '140123', city_code: '16', id: '23', value: '娄烦县'}, {
  admin_code: '140202',
  city_code: '222',
  id: '02',
  value: '城区'
}, {admin_code: '140203', city_code: '222', id: '03', value: '矿区'}, {
  admin_code: '140211',
  city_code: '222',
  id: '11',
  value: '南郊区'
}, {admin_code: '140212', city_code: '222', id: '12', value: '新荣区'}, {
  admin_code: '140221',
  city_code: '222',
  id: '21',
  value: '阳高县'
}, {admin_code: '140222', city_code: '222', id: '22', value: '天镇县'}, {
  admin_code: '140223',
  city_code: '222',
  id: '23',
  value: '广灵县'
}, {admin_code: '140224', city_code: '222', id: '24', value: '灵丘县'}, {
  admin_code: '140225',
  city_code: '222',
  id: '25',
  value: '浑源县'
}, {admin_code: '140226', city_code: '222', id: '26', value: '左云县'}, {
  admin_code: '140227',
  city_code: '222',
  id: '27',
  value: '大同县'
}, {admin_code: '140602', city_code: '310', id: '02', value: '朔城区'}, {
  admin_code: '140603',
  city_code: '310',
  id: '03',
  value: '平鲁区'
}, {admin_code: '140621', city_code: '310', id: '21', value: '山阴县'}, {
  admin_code: '140622',
  city_code: '310',
  id: '22',
  value: '应县'
}, {admin_code: '140623', city_code: '310', id: '23', value: '右玉县'}, {
  admin_code: '140681',
  city_code: '310',
  id: '24',
  value: '怀仁市'
}, {admin_code: '140302', city_code: '43', id: '02', value: '城区'}, {
  admin_code: '140303',
  city_code: '43',
  id: '03',
  value: '矿区'
}, {admin_code: '140311', city_code: '43', id: '11', value: '郊区'}, {
  admin_code: '140321',
  city_code: '43',
  id: '21',
  value: '平定县'
}, {admin_code: '140322', city_code: '43', id: '22', value: '盂县'}, {
  admin_code: '140402',
  city_code: '311',
  id: '02',
  value: '城区'
}, {admin_code: '140411', city_code: '311', id: '11', value: '郊区'}, {
  admin_code: '140481',
  city_code: '311',
  id: '81',
  value: '潞城市'
}, {admin_code: '140421', city_code: '311', id: '21', value: '长治县'}, {
  admin_code: '140423',
  city_code: '311',
  id: '23',
  value: '襄垣县'
}, {admin_code: '140424', city_code: '311', id: '24', value: '屯留县'}, {
  admin_code: '140425',
  city_code: '311',
  id: '25',
  value: '平顺县'
}, {admin_code: '140426', city_code: '311', id: '26', value: '黎城县'}, {
  admin_code: '140427',
  city_code: '311',
  id: '27',
  value: '壶关县'
}, {admin_code: '140428', city_code: '311', id: '28', value: '长子县'}, {
  admin_code: '140429',
  city_code: '311',
  id: '29',
  value: '武乡县'
}, {admin_code: '140430', city_code: '311', id: '30', value: '沁县'}, {
  admin_code: '140431',
  city_code: '311',
  id: '31',
  value: '沁源县'
}, {admin_code: '140502', city_code: '277', id: '02', value: '城区'}, {
  admin_code: '140581',
  city_code: '277',
  id: '81',
  value: '高平市'
}, {admin_code: '140525', city_code: '277', id: '25', value: '泽州县'}, {
  admin_code: '140521',
  city_code: '277',
  id: '21',
  value: '沁水县'
}, {admin_code: '140522', city_code: '277', id: '22', value: '阳城县'}, {
  admin_code: '140524',
  city_code: '277',
  id: '24',
  value: '陵川县'
}, {admin_code: '140902', city_code: '99', id: '02', value: '忻府区'}, {
  admin_code: '140981',
  city_code: '99',
  id: '81',
  value: '原平市'
}, {admin_code: '140921', city_code: '99', id: '21', value: '定襄县'}, {
  admin_code: '140922',
  city_code: '99',
  id: '22',
  value: '五台县'
}, {admin_code: '140923', city_code: '99', id: '23', value: '代县'}, {
  admin_code: '140924',
  city_code: '99',
  id: '24',
  value: '繁峙县'
}, {admin_code: '140925', city_code: '99', id: '25', value: '宁武县'}, {
  admin_code: '140926',
  city_code: '99',
  id: '26',
  value: '静乐县'
}, {admin_code: '140927', city_code: '99', id: '27', value: '神池县'}, {
  admin_code: '140928',
  city_code: '99',
  id: '28',
  value: '五寨县'
}, {admin_code: '140929', city_code: '99', id: '29', value: '岢岚县'}, {
  admin_code: '140930',
  city_code: '99',
  id: '30',
  value: '河曲县'
}, {admin_code: '140931', city_code: '99', id: '31', value: '保德县'}, {
  admin_code: '140932',
  city_code: '99',
  id: '32',
  value: '偏关县'
}, {admin_code: '140702', city_code: '202', id: '02', value: '榆次区'}, {
  admin_code: '140781',
  city_code: '202',
  id: '81',
  value: '介休市'
}, {admin_code: '140721', city_code: '202', id: '21', value: '榆社县'}, {
  admin_code: '140722',
  city_code: '202',
  id: '22',
  value: '左权县'
}, {admin_code: '140723', city_code: '202', id: '23', value: '和顺县'}, {
  admin_code: '140724',
  city_code: '202',
  id: '24',
  value: '昔阳县'
}, {admin_code: '140725', city_code: '202', id: '25', value: '寿阳县'}, {
  admin_code: '140726',
  city_code: '202',
  id: '26',
  value: '太谷县'
}, {admin_code: '140727', city_code: '202', id: '27', value: '祁县'}, {
  admin_code: '140728',
  city_code: '202',
  id: '28',
  value: '平遥县'
}, {admin_code: '140729', city_code: '202', id: '29', value: '灵石县'}, {
  admin_code: '141002',
  city_code: '236',
  id: '02',
  value: '尧都区'
}, {admin_code: '141081', city_code: '236', id: '81', value: '侯马市'}, {
  admin_code: '141082',
  city_code: '236',
  id: '82',
  value: '霍州市'
}, {admin_code: '141021', city_code: '236', id: '21', value: '曲沃县'}, {
  admin_code: '141022',
  city_code: '236',
  id: '22',
  value: '翼城县'
}, {admin_code: '141023', city_code: '236', id: '23', value: '襄汾县'}, {
  admin_code: '141024',
  city_code: '236',
  id: '24',
  value: '洪洞县'
}, {admin_code: '141025', city_code: '236', id: '25', value: '古县'}, {
  admin_code: '141026',
  city_code: '236',
  id: '26',
  value: '安泽县'
}, {admin_code: '141027', city_code: '236', id: '27', value: '浮山县'}, {
  admin_code: '141028',
  city_code: '236',
  id: '28',
  value: '吉县'
}, {admin_code: '141029', city_code: '236', id: '29', value: '乡宁县'}, {
  admin_code: '141033',
  city_code: '236',
  id: '33',
  value: '蒲县'
}, {admin_code: '141030', city_code: '236', id: '30', value: '大宁县'}, {
  admin_code: '141032',
  city_code: '236',
  id: '32',
  value: '永和县'
}, {admin_code: '141031', city_code: '236', id: '31', value: '隰县'}, {
  admin_code: '141034',
  city_code: '236',
  id: '34',
  value: '汾西县'
}, {admin_code: '140802', city_code: '54', id: '02', value: '盐湖区'}, {
  admin_code: '140881',
  city_code: '54',
  id: '81',
  value: '永济市'
}, {admin_code: '140882', city_code: '54', id: '82', value: '河津市'}, {
  admin_code: '140830',
  city_code: '54',
  id: '30',
  value: '芮城县'
}, {admin_code: '140821', city_code: '54', id: '21', value: '临猗县'}, {
  admin_code: '140822',
  city_code: '54',
  id: '22',
  value: '万荣县'
}, {admin_code: '140825', city_code: '54', id: '25', value: '新绛县'}, {
  admin_code: '140824',
  city_code: '54',
  id: '24',
  value: '稷山县'
}, {admin_code: '140823', city_code: '54', id: '23', value: '闻喜县'}, {
  admin_code: '140828',
  city_code: '54',
  id: '28',
  value: '夏县'
}, {admin_code: '140826', city_code: '54', id: '26', value: '绛县'}, {
  admin_code: '140829',
  city_code: '54',
  id: '29',
  value: '平陆县'
}, {admin_code: '140827', city_code: '54', id: '27', value: '垣曲县'}, {
  admin_code: '420102',
  city_code: '234',
  id: '02',
  value: '江岸区'
}, {admin_code: '420103', city_code: '234', id: '03', value: '江汉区'}, {
  admin_code: '420104',
  city_code: '234',
  id: '04',
  value: '硚口区'
}, {admin_code: '420105', city_code: '234', id: '05', value: '汉阳区'}, {
  admin_code: '420106',
  city_code: '234',
  id: '06',
  value: '武昌区'
}, {admin_code: '420107', city_code: '234', id: '07', value: '青山区'}, {
  admin_code: '420111',
  city_code: '234',
  id: '11',
  value: '洪山区'
}, {admin_code: '420112', city_code: '234', id: '12', value: '东西湖区'}, {
  admin_code: '420113',
  city_code: '234',
  id: '13',
  value: '汉南区'
}, {admin_code: '420114', city_code: '234', id: '14', value: '蔡甸区'}, {
  admin_code: '420116',
  city_code: '234',
  id: '16',
  value: '黄陂区'
}, {admin_code: '420117', city_code: '234', id: '17', value: '新洲区'}, {
  admin_code: '420882',
  city_code: '29',
  id: '21',
  value: '京山市'
}, {admin_code: '420902', city_code: '121', id: '02', value: '孝南区'}, {
  admin_code: '420981',
  city_code: '121',
  id: '81',
  value: '应城市'
}, {admin_code: '420982', city_code: '121', id: '82', value: '安陆市'}, {
  admin_code: '420984',
  city_code: '121',
  id: '84',
  value: '汉川市'
}, {admin_code: '420921', city_code: '121', id: '21', value: '孝昌县'}, {
  admin_code: '420922',
  city_code: '121',
  id: '22',
  value: '大悟县'
}, {admin_code: '420923', city_code: '121', id: '23', value: '云梦县'}, {
  admin_code: '421102',
  city_code: '168',
  id: '02',
  value: '黄州区'
}, {admin_code: '421181', city_code: '168', id: '81', value: '麻城市'}, {
  admin_code: '421182',
  city_code: '168',
  id: '82',
  value: '武穴市'
}, {admin_code: '421122', city_code: '168', id: '22', value: '红安县'}, {
  admin_code: '421123',
  city_code: '168',
  id: '23',
  value: '罗田县'
}, {admin_code: '421124', city_code: '168', id: '24', value: '英山县'}, {
  admin_code: '421125',
  city_code: '168',
  id: '25',
  value: '浠水县'
}, {admin_code: '421126', city_code: '168', id: '26', value: '蕲春县'}, {
  admin_code: '421127',
  city_code: '168',
  id: '27',
  value: '黄梅县'
}, {admin_code: '421121', city_code: '168', id: '21', value: '团风县'}, {
  admin_code: '420704',
  city_code: '171',
  id: '04',
  value: '鄂城区'
}, {admin_code: '420702', city_code: '171', id: '02', value: '梁子湖区'}, {
  admin_code: '420703',
  city_code: '171',
  id: '03',
  value: '华容区'
}, {admin_code: '420202', city_code: '75', id: '02', value: '黄石港区'}, {
  admin_code: '420203',
  city_code: '75',
  id: '03',
  value: '西塞山区'
}, {admin_code: '420204', city_code: '75', id: '04', value: '下陆区'}, {
  admin_code: '420205',
  city_code: '75',
  id: '05',
  value: '铁山区'
}, {admin_code: '420281', city_code: '75', id: '81', value: '大冶市'}, {
  admin_code: '420222',
  city_code: '75',
  id: '22',
  value: '阳新县'
}, {admin_code: '421202', city_code: '232', id: '02', value: '咸安区'}, {
  admin_code: '421281',
  city_code: '232',
  id: '81',
  value: '赤壁市'
}, {admin_code: '421221', city_code: '232', id: '21', value: '嘉鱼县'}, {
  admin_code: '421222',
  city_code: '232',
  id: '22',
  value: '通城县'
}, {admin_code: '421223', city_code: '232', id: '23', value: '崇阳县'}, {
  admin_code: '421224',
  city_code: '232',
  id: '24',
  value: '通山县'
}, {admin_code: '421002', city_code: '191', id: '02', value: '沙市区'}, {
  admin_code: '421003',
  city_code: '191',
  id: '03',
  value: '荆州区'
}, {admin_code: '421081', city_code: '191', id: '81', value: '石首市'}, {
  admin_code: '421083',
  city_code: '191',
  id: '83',
  value: '洪湖市'
}, {admin_code: '421087', city_code: '191', id: '87', value: '松滋市'}, {
  admin_code: '421024',
  city_code: '191',
  id: '24',
  value: '江陵县'
}, {admin_code: '421022', city_code: '191', id: '22', value: '公安县'}, {
  admin_code: '421023',
  city_code: '191',
  id: '23',
  value: '监利县'
}, {admin_code: '420502', city_code: '207', id: '02', value: '西陵区'}, {
  admin_code: '420503',
  city_code: '207',
  id: '03',
  value: '伍家岗区'
}, {admin_code: '420504', city_code: '207', id: '04', value: '点军区'}, {
  admin_code: '420505',
  city_code: '207',
  id: '05',
  value: '猇亭区'
}, {admin_code: '420506', city_code: '207', id: '06', value: '夷陵区'}, {
  admin_code: '420583',
  city_code: '207',
  id: '83',
  value: '枝江市'
}, {admin_code: '420581', city_code: '207', id: '81', value: '宜都市'}, {
  admin_code: '420582',
  city_code: '207',
  id: '82',
  value: '当阳市'
}, {admin_code: '420525', city_code: '207', id: '25', value: '远安县'}, {
  admin_code: '420526',
  city_code: '207',
  id: '26',
  value: '兴山县'
}, {admin_code: '420527', city_code: '207', id: '27', value: '秭归县'}, {
  admin_code: '420528',
  city_code: '207',
  id: '28',
  value: '长阳土家族自治县'
}, {admin_code: '420529', city_code: '207', id: '29', value: '五峰土家族自治县'}, {
  admin_code: '421381',
  city_code: '297',
  id: '81',
  value: '广水市'
}, {admin_code: '429004', city_code: '77', id: '04', value: '仙桃市'}, {
  admin_code: '429006',
  city_code: '299',
  id: '06',
  value: '天门市'
}, {admin_code: '429005', city_code: '42', id: '05', value: '潜江市'}, {
  admin_code: '422801',
  city_code: '262',
  id: '01',
  value: '恩施市'
}, {admin_code: '422802', city_code: '262', id: '02', value: '利川市'}, {
  admin_code: '422822',
  city_code: '262',
  id: '22',
  value: '建始县'
}, {admin_code: '422823', city_code: '262', id: '23', value: '巴东县'}, {
  admin_code: '422825',
  city_code: '262',
  id: '25',
  value: '宣恩县'
}, {admin_code: '422826', city_code: '262', id: '26', value: '咸丰县'}, {
  admin_code: '422827',
  city_code: '262',
  id: '27',
  value: '来凤县'
}, {admin_code: '422828', city_code: '262', id: '28', value: '鹤峰县'}, {
  admin_code: '320202',
  city_code: '341',
  id: '02',
  value: '崇安区'
}, {admin_code: '320282', city_code: '342', id: '82', value: '宜兴市'}, {
  admin_code: '320281',
  city_code: '342',
  id: '81',
  value: '江阴市'
}, {admin_code: '320404', city_code: '130', id: '04', value: '钟楼区'}, {
  admin_code: '320413',
  city_code: '130',
  id: '13',
  value: '金坛区'
}, {admin_code: '320481', city_code: '130', id: '81', value: '溧阳市'}, {
  admin_code: '320509',
  city_code: '227',
  id: '09',
  value: '吴江区'
}, {admin_code: '320583', city_code: '227', id: '83', value: '昆山市'}, {
  admin_code: '320585',
  city_code: '227',
  id: '85',
  value: '太仓市'
}, {admin_code: '320581', city_code: '227', id: '81', value: '常熟市'}, {
  admin_code: '320582',
  city_code: '227',
  id: '82',
  value: '张家港市'
}, {admin_code: '320602', city_code: '217', id: '02', value: '崇川区'}, {
  admin_code: '320684',
  city_code: '217',
  id: '84',
  value: '海门市'
}, {admin_code: '320681', city_code: '217', id: '81', value: '启东市'}, {
  admin_code: '320612',
  city_code: '217',
  id: '12',
  value: '通州区'
}, {admin_code: '320623', city_code: '217', id: '23', value: '如东县'}, {
  admin_code: '320682',
  city_code: '217',
  id: '82',
  value: '如皋市'
}, {admin_code: '320685', city_code: '217', id: '21', value: '海安市'}, {
  admin_code: '420303',
  city_code: '189',
  id: '03',
  value: '张湾区'
}, {admin_code: '420302', city_code: '189', id: '02', value: '茅箭区'}, {
  admin_code: '420381',
  city_code: '189',
  id: '81',
  value: '丹江口市'
}, {admin_code: '420304', city_code: '189', id: '04', value: '郧阳区'}, {
  admin_code: '420323',
  city_code: '189',
  id: '23',
  value: '竹山县'
}, {admin_code: '420325', city_code: '189', id: '25', value: '房县'}, {
  admin_code: '420322',
  city_code: '189',
  id: '22',
  value: '郧西县'
}, {admin_code: '420324', city_code: '189', id: '24', value: '竹溪县'}, {
  admin_code: '420602',
  city_code: '183',
  id: '02',
  value: '襄城区'
}, {admin_code: '420606', city_code: '183', id: '06', value: '樊城区'}, {
  admin_code: '420607',
  city_code: '183',
  id: '07',
  value: '襄州区'
}, {admin_code: '420682', city_code: '183', id: '82', value: '老河口市'}, {
  admin_code: '420683',
  city_code: '183',
  id: '83',
  value: '枣阳市'
}, {admin_code: '420684', city_code: '183', id: '84', value: '宜城市'}, {
  admin_code: '420624',
  city_code: '183',
  id: '24',
  value: '南漳县'
}, {admin_code: '420625', city_code: '183', id: '25', value: '谷城县'}, {
  admin_code: '420626',
  city_code: '183',
  id: '26',
  value: '保康县'
}, {admin_code: '420802', city_code: '29', id: '02', value: '东宝区'}, {
  admin_code: '420804',
  city_code: '29',
  id: '04',
  value: '掇刀区'
}, {admin_code: '420881', city_code: '29', id: '81', value: '钟祥市'}, {
  admin_code: '420822',
  city_code: '29',
  id: '22',
  value: '沙洋县'
}, {admin_code: '421303', city_code: '297', id: '03', value: '曾都区'}, {
  admin_code: '429021',
  city_code: '255',
  id: '21',
  value: '神农架林区'
}, {admin_code: '650102', city_code: '228', id: '02', value: '天山区'}, {
  admin_code: '650103',
  city_code: '228',
  id: '03',
  value: '沙依巴克区'
}, {admin_code: '650104', city_code: '228', id: '04', value: '新市区'}, {
  admin_code: '650105',
  city_code: '228',
  id: '05',
  value: '水磨沟区'
}, {admin_code: '650106', city_code: '228', id: '06', value: '头屯河区'}, {
  admin_code: '650107',
  city_code: '228',
  id: '07',
  value: '达坂城区'
}, {admin_code: '650109', city_code: '228', id: '09', value: '米东区'}, {
  admin_code: '650121',
  city_code: '228',
  id: '21',
  value: '乌鲁木齐县'
}, {admin_code: '650203', city_code: '186', id: '03', value: '克拉玛依区'}, {
  admin_code: '650202',
  city_code: '186',
  id: '02',
  value: '独山子区'
}, {admin_code: '650204', city_code: '186', id: '04', value: '白碱滩区'}, {
  admin_code: '650205',
  city_code: '186',
  id: '05',
  value: '乌尔禾区'
}, {admin_code: '659001', city_code: '155', id: '02', value: '石河子市'}, {
  admin_code: '659002',
  city_code: '238',
  id: '02',
  value: '阿拉尔市'
}, {admin_code: '659003', city_code: '317', id: '03', value: '图木舒克市'}, {
  admin_code: '659004',
  city_code: '190',
  id: '04',
  value: '五家渠市'
}, {admin_code: '653101', city_code: '317', id: '01', value: '喀什市'}, {
  admin_code: '653121',
  city_code: '317',
  id: '21',
  value: '疏附县'
}, {admin_code: '653122', city_code: '317', id: '22', value: '疏勒县'}, {
  admin_code: '653123',
  city_code: '317',
  id: '23',
  value: '英吉沙县'
}, {admin_code: '653124', city_code: '317', id: '24', value: '泽普县'}, {
  admin_code: '653125',
  city_code: '317',
  id: '25',
  value: '莎车县'
}, {admin_code: '653126', city_code: '317', id: '26', value: '叶城县'}, {
  admin_code: '653127',
  city_code: '317',
  id: '27',
  value: '麦盖提县'
}, {admin_code: '653128', city_code: '317', id: '28', value: '岳普湖县'}, {
  admin_code: '653129',
  city_code: '317',
  id: '29',
  value: '伽师县'
}, {admin_code: '653130', city_code: '317', id: '30', value: '巴楚县'}, {
  admin_code: '653131',
  city_code: '317',
  id: '31',
  value: '塔什库尔干塔吉克自治县'
}, {admin_code: '652901', city_code: '238', id: '01', value: '阿克苏市'}, {
  admin_code: '652922',
  city_code: '238',
  id: '22',
  value: '温宿县'
}, {admin_code: '652923', city_code: '238', id: '23', value: '库车县'}, {
  admin_code: '652924',
  city_code: '238',
  id: '24',
  value: '沙雅县'
}, {admin_code: '652925', city_code: '238', id: '25', value: '新和县'}, {
  admin_code: '652926',
  city_code: '238',
  id: '26',
  value: '拜城县'
}, {admin_code: '652927', city_code: '238', id: '27', value: '乌什县'}, {
  admin_code: '652928',
  city_code: '238',
  id: '28',
  value: '阿瓦提县'
}, {admin_code: '652929', city_code: '238', id: '29', value: '柯坪县'}, {
  admin_code: '653201',
  city_code: '65',
  id: '01',
  value: '和田市'
}, {admin_code: '653222', city_code: '65', id: '22', value: '墨玉县'}, {
  admin_code: '653223',
  city_code: '65',
  id: '23',
  value: '皮山县'
}, {admin_code: '653224', city_code: '65', id: '24', value: '洛浦县'}, {
  admin_code: '653225',
  city_code: '65',
  id: '25',
  value: '策勒县'
}, {admin_code: '653226', city_code: '65', id: '26', value: '于田县'}, {
  admin_code: '653227',
  city_code: '65',
  id: '27',
  value: '民丰县'
}, {admin_code: '650402', city_code: '66', id: '02', value: '高昌区'}, {
  admin_code: '650421',
  city_code: '66',
  id: '21',
  value: '鄯善县'
}, {admin_code: '650422', city_code: '66', id: '22', value: '托克逊县'}, {
  admin_code: '650502',
  city_code: '239',
  id: '02',
  value: '伊州区'
}, {admin_code: '650522', city_code: '239', id: '22', value: '伊吾县'}, {
  admin_code: '650521',
  city_code: '239',
  id: '21',
  value: '巴里坤哈萨克自治县'
}, {admin_code: '653001', city_code: '280', id: '01', value: '阿图什市'}, {
  admin_code: '653022',
  city_code: '280',
  id: '22',
  value: '阿克陶县'
}, {admin_code: '653023', city_code: '280', id: '23', value: '阿合奇县'}, {
  admin_code: '653024',
  city_code: '280',
  id: '24',
  value: '乌恰县'
}, {admin_code: '652701', city_code: '281', id: '01', value: '博乐市'}, {
  admin_code: '652722',
  city_code: '281',
  id: '22',
  value: '精河县'
}, {admin_code: '652723', city_code: '281', id: '23', value: '温泉县'}, {
  admin_code: '652301',
  city_code: '190',
  id: '01',
  value: '昌吉市'
}, {admin_code: '652302', city_code: '190', id: '02', value: '阜康市'}, {
  admin_code: '652323',
  city_code: '190',
  id: '23',
  value: '呼图壁县'
}, {admin_code: '652324', city_code: '190', id: '24', value: '玛纳斯县'}, {
  admin_code: '652325',
  city_code: '190',
  id: '25',
  value: '奇台县'
}, {admin_code: '652327', city_code: '190', id: '27', value: '吉木萨尔县'}, {
  admin_code: '652328',
  city_code: '190',
  id: '28',
  value: '木垒哈萨克自治县'
}, {admin_code: '652801', city_code: '229', id: '01', value: '库尔勒市'}, {
  admin_code: '652822',
  city_code: '229',
  id: '22',
  value: '轮台县'
}, {admin_code: '652823', city_code: '229', id: '23', value: '尉犁县'}, {
  admin_code: '652824',
  city_code: '229',
  id: '24',
  value: '若羌县'
}, {admin_code: '652825', city_code: '229', id: '25', value: '且末县'}, {
  admin_code: '652827',
  city_code: '229',
  id: '27',
  value: '和静县'
}, {admin_code: '652828', city_code: '229', id: '28', value: '和硕县'}, {
  admin_code: '652829',
  city_code: '229',
  id: '29',
  value: '博湖县'
}, {admin_code: '652826', city_code: '229', id: '26', value: '焉耆回族自治县'}, {
  admin_code: '654003',
  city_code: '87',
  id: '03',
  value: '奎屯市'
}, {admin_code: '654002', city_code: '87', id: '02', value: '伊宁市'}, {
  admin_code: '654023',
  city_code: '87',
  id: '23',
  value: '霍城县'
}, {admin_code: '654024', city_code: '87', id: '24', value: '巩留县'}, {
  admin_code: '654025',
  city_code: '87',
  id: '25',
  value: '新源县'
}, {admin_code: '654026', city_code: '87', id: '26', value: '昭苏县'}, {
  admin_code: '654027',
  city_code: '87',
  id: '27',
  value: '特克斯县'
}, {admin_code: '654028', city_code: '87', id: '28', value: '尼勒克县'}, {
  admin_code: '654022',
  city_code: '87',
  id: '22',
  value: '察布查尔锡伯自治县'
}, {admin_code: '654201', city_code: '15', id: '01', value: '塔城市'}, {
  admin_code: '654202',
  city_code: '15',
  id: '02',
  value: '乌苏市'
}, {admin_code: '654221', city_code: '15', id: '21', value: '额敏县'}, {
  admin_code: '654223',
  city_code: '15',
  id: '23',
  value: '沙湾县'
}, {admin_code: '654224', city_code: '15', id: '24', value: '托里县'}, {
  admin_code: '654225',
  city_code: '15',
  id: '25',
  value: '裕民县'
}, {admin_code: '654226', city_code: '15', id: '26', value: '和布克赛尔蒙古自治县'}, {
  admin_code: '654301',
  city_code: '155',
  id: '01',
  value: '阿勒泰市'
}, {admin_code: '654321', city_code: '155', id: '21', value: '布尔津县'}, {
  admin_code: '654322',
  city_code: '155',
  id: '22',
  value: '富蕴县'
}, {admin_code: '654323', city_code: '155', id: '23', value: '福海县'}, {
  admin_code: '654324',
  city_code: '155',
  id: '24',
  value: '哈巴河县'
}, {admin_code: '654325', city_code: '155', id: '25', value: '青河县'}, {
  admin_code: '654326',
  city_code: '155',
  id: '26',
  value: '吉木乃县'
}, {admin_code: '350211', city_code: '203', id: '11', value: '集美区'}, {
  admin_code: '350206',
  city_code: '203',
  id: '06',
  value: '湖里区'
}, {admin_code: '350203', city_code: '203', id: '03', value: '思明区'}, {
  admin_code: '350205',
  city_code: '203',
  id: '05',
  value: '海沧区'
}, {admin_code: '350212', city_code: '203', id: '12', value: '同安区'}, {
  admin_code: '350502',
  city_code: '276',
  id: '02',
  value: '鲤城区'
}, {admin_code: '350503', city_code: '276', id: '03', value: '丰泽区'}, {
  admin_code: '350504',
  city_code: '276',
  id: '04',
  value: '洛江区'
}, {admin_code: '350582', city_code: '276', id: '82', value: '晋江市'}, {
  admin_code: '350524',
  city_code: '276',
  id: '24',
  value: '安溪县'
}, {admin_code: '350581', city_code: '276', id: '81', value: '石狮市'}, {
  admin_code: '350521',
  city_code: '276',
  id: '21',
  value: '惠安县'
}, {admin_code: '350526', city_code: '276', id: '26', value: '德化县'}, {
  admin_code: '350525',
  city_code: '276',
  id: '25',
  value: '永春县'
}, {admin_code: '350583', city_code: '276', id: '83', value: '南安市'}, {
  admin_code: '350602',
  city_code: '220',
  id: '02',
  value: '芗城区'
}, {admin_code: '350603', city_code: '220', id: '03', value: '龙文区'}, {
  admin_code: '350622',
  city_code: '220',
  id: '22',
  value: '云霄县'
}, {admin_code: '350681', city_code: '220', id: '81', value: '龙海市'}, {
  admin_code: '350627',
  city_code: '220',
  id: '27',
  value: '南靖县'
}, {admin_code: '350623', city_code: '220', id: '23', value: '漳浦县'}, {
  admin_code: '350624',
  city_code: '220',
  id: '24',
  value: '诏安县'
}, {admin_code: '350626', city_code: '220', id: '26', value: '东山县'}, {
  admin_code: '350625',
  city_code: '220',
  id: '25',
  value: '长泰县'
}, {admin_code: '350628', city_code: '220', id: '28', value: '平和县'}, {
  admin_code: '350629',
  city_code: '220',
  id: '29',
  value: '华安县'
}, {admin_code: '350802', city_code: '221', id: '02', value: '新罗区'}, {
  admin_code: '350821',
  city_code: '221',
  id: '21',
  value: '长汀县'
}, {admin_code: '350881', city_code: '221', id: '81', value: '漳平市'}, {
  admin_code: '350825',
  city_code: '221',
  id: '25',
  value: '连城县'
}, {admin_code: '350824', city_code: '221', id: '24', value: '武平县'}, {
  admin_code: '350823',
  city_code: '221',
  id: '23',
  value: '上杭县'
}, {admin_code: '350803', city_code: '221', id: '03', value: '永定区'}, {
  admin_code: '630103',
  city_code: '264',
  id: '03',
  value: '城中区'
}, {admin_code: '630102', city_code: '264', id: '02', value: '城东区'}, {
  admin_code: '630104',
  city_code: '264',
  id: '04',
  value: '城西区'
}, {admin_code: '630105', city_code: '264', id: '05', value: '城北区'}, {
  admin_code: '630121',
  city_code: '264',
  id: '21',
  value: '大通回族土族自治县'
}, {admin_code: '630123', city_code: '264', id: '23', value: '湟源县'}, {
  admin_code: '630122',
  city_code: '264',
  id: '22',
  value: '湟中县'
}, {admin_code: '630203', city_code: '303', id: '03', value: '平安区'}, {
  admin_code: '630202',
  city_code: '303',
  id: '02',
  value: '乐都区'
}, {admin_code: '630222', city_code: '303', id: '22', value: '民和回族土族自治县'}, {
  admin_code: '630223',
  city_code: '303',
  id: '23',
  value: '互助土族自治县'
}, {admin_code: '630224', city_code: '303', id: '24', value: '化隆回族自治县'}, {
  admin_code: '630225',
  city_code: '303',
  id: '25',
  value: '循化撒拉族自治县'
}, {admin_code: '632223', city_code: '213', id: '23', value: '海晏县'}, {
  admin_code: '632222',
  city_code: '213',
  id: '22',
  value: '祁连县'
}, {admin_code: '632224', city_code: '213', id: '24', value: '刚察县'}, {
  admin_code: '632221',
  city_code: '213',
  id: '21',
  value: '门源回族自治县'
}, {admin_code: '632521', city_code: '97', id: '21', value: '共和县'}, {
  admin_code: '632522',
  city_code: '97',
  id: '22',
  value: '同德县'
}, {admin_code: '632523', city_code: '97', id: '23', value: '贵德县'}, {
  admin_code: '632524',
  city_code: '97',
  id: '24',
  value: '兴海县'
}, {admin_code: '632525', city_code: '97', id: '25', value: '贵南县'}, {
  admin_code: '632321',
  city_code: '304',
  id: '21',
  value: '同仁县'
}, {admin_code: '632322', city_code: '304', id: '22', value: '尖扎县'}, {
  admin_code: '632323',
  city_code: '304',
  id: '23',
  value: '泽库县'
}, {admin_code: '632324', city_code: '304', id: '24', value: '河南蒙古族自治县'}, {
  admin_code: '632621',
  city_code: '305',
  id: '21',
  value: '玛沁县'
}, {admin_code: '632622', city_code: '305', id: '22', value: '班玛县'}, {
  admin_code: '632623',
  city_code: '305',
  id: '23',
  value: '甘德县'
}, {admin_code: '632624', city_code: '305', id: '24', value: '达日县'}, {
  admin_code: '632625',
  city_code: '305',
  id: '25',
  value: '久治县'
}, {admin_code: '632626', city_code: '305', id: '26', value: '玛多县'}, {
  admin_code: '632701',
  city_code: '340',
  id: '01',
  value: '玉树市'
}, {admin_code: '632722', city_code: '340', id: '22', value: '杂多县'}, {
  admin_code: '632723',
  city_code: '340',
  id: '23',
  value: '称多县'
}, {admin_code: '632724', city_code: '340', id: '24', value: '治多县'}, {
  admin_code: '632725',
  city_code: '340',
  id: '25',
  value: '囊谦县'
}, {admin_code: '632726', city_code: '340', id: '26', value: '曲麻莱县'}, {
  admin_code: '632802',
  city_code: '125',
  id: '02',
  value: '德令哈市'
}, {admin_code: '632801', city_code: '125', id: '01', value: '格尔木市'}, {
  admin_code: '632821',
  city_code: '125',
  id: '21',
  value: '乌兰县'
}, {admin_code: '632822', city_code: '125', id: '22', value: '都兰县'}, {
  admin_code: '632823',
  city_code: '125',
  id: '23',
  value: '天峻县'
}, {admin_code: '540102', city_code: '120', id: '02', value: '城关区'}, {
  admin_code: '540121',
  city_code: '120',
  id: '21',
  value: '林周县'
}, {admin_code: '540122', city_code: '120', id: '22', value: '当雄县'}, {
  admin_code: '540123',
  city_code: '120',
  id: '23',
  value: '尼木县'
}, {admin_code: '540124', city_code: '120', id: '24', value: '曲水县'}, {
  admin_code: '540103',
  city_code: '120',
  id: '03',
  value: '堆龙德庆区'
}, {admin_code: '540126', city_code: '120', id: '26', value: '达孜县'}, {
  admin_code: '540127',
  city_code: '120',
  id: '27',
  value: '墨竹工卡县'
}, {admin_code: '542421', city_code: '265', id: '21', value: '那曲县'}, {
  admin_code: '542422',
  city_code: '265',
  id: '22',
  value: '嘉黎县'
}, {admin_code: '542423', city_code: '265', id: '23', value: '比如县'}, {
  admin_code: '542424',
  city_code: '265',
  id: '24',
  value: '聂荣县'
}, {admin_code: '542425', city_code: '265', id: '25', value: '安多县'}, {
  admin_code: '542426',
  city_code: '265',
  id: '26',
  value: '申扎县'
}, {admin_code: '542427', city_code: '265', id: '27', value: '索县'}, {
  admin_code: '542428',
  city_code: '265',
  id: '28',
  value: '班戈县'
}, {admin_code: '542429', city_code: '265', id: '29', value: '巴青县'}, {
  admin_code: '542430',
  city_code: '265',
  id: '30',
  value: '尼玛县'
}, {admin_code: '540321', city_code: '2', id: '21', value: '江达县'}, {
  admin_code: '540322',
  city_code: '2',
  id: '22',
  value: '贡觉县'
}, {admin_code: '540323', city_code: '2', id: '23', value: '类乌齐县'}, {
  admin_code: '540324',
  city_code: '2',
  id: '24',
  value: '丁青县'
}, {admin_code: '540325', city_code: '2', id: '25', value: '察雅县'}, {
  admin_code: '540326',
  city_code: '2',
  id: '26',
  value: '八宿县'
}, {admin_code: '540327', city_code: '2', id: '27', value: '左贡县'}, {
  admin_code: '540328',
  city_code: '2',
  id: '28',
  value: '芒康县'
}, {admin_code: '540329', city_code: '2', id: '29', value: '洛隆县'}, {
  admin_code: '540330',
  city_code: '2',
  id: '30',
  value: '边坝县'
}, {admin_code: '540402', city_code: '343', id: '02', value: '巴宜区'}, {
  admin_code: '540421',
  city_code: '343',
  id: '21',
  value: '工布江达县'
}, {admin_code: '540422', city_code: '343', id: '22', value: '米林县'}, {
  admin_code: '540423',
  city_code: '343',
  id: '23',
  value: '墨脱县'
}, {admin_code: '540424', city_code: '343', id: '24', value: '波密县'}, {
  admin_code: '540425',
  city_code: '343',
  id: '25',
  value: '察隅县'
}, {admin_code: '540426', city_code: '343', id: '26', value: '朗县'}, {
  admin_code: '540502',
  city_code: '140',
  id: '02',
  value: '乃东区'
}, {admin_code: '540521', city_code: '140', id: '21', value: '扎囊县'}, {
  admin_code: '540522',
  city_code: '140',
  id: '22',
  value: '贡嘎县'
}, {admin_code: '540523', city_code: '140', id: '23', value: '桑日县'}, {
  admin_code: '540524',
  city_code: '140',
  id: '24',
  value: '琼结县'
}, {admin_code: '540525', city_code: '140', id: '25', value: '曲松县'}, {
  admin_code: '540526',
  city_code: '140',
  id: '26',
  value: '措美县'
}, {admin_code: '540527', city_code: '140', id: '27', value: '洛扎县'}, {
  admin_code: '540528',
  city_code: '140',
  id: '28',
  value: '加查县'
}, {admin_code: '540529', city_code: '140', id: '29', value: '隆子县'}, {
  admin_code: '540530',
  city_code: '140',
  id: '30',
  value: '错那县'
}, {admin_code: '540531', city_code: '140', id: '31', value: '浪卡子县'}, {
  admin_code: '540202',
  city_code: '98',
  id: '02',
  value: '桑珠孜区'
}, {admin_code: '540221', city_code: '98', id: '21', value: '南木林县'}, {
  admin_code: '540222',
  city_code: '98',
  id: '22',
  value: '江孜县'
}, {admin_code: '540223', city_code: '98', id: '23', value: '定日县'}, {
  admin_code: '540224',
  city_code: '98',
  id: '24',
  value: '萨迦县'
}, {admin_code: '540225', city_code: '98', id: '25', value: '拉孜县'}, {
  admin_code: '540226',
  city_code: '98',
  id: '26',
  value: '昂仁县'
}, {admin_code: '540227', city_code: '98', id: '27', value: '谢通门县'}, {
  admin_code: '540228',
  city_code: '98',
  id: '28',
  value: '白朗县'
}, {admin_code: '540229', city_code: '98', id: '29', value: '仁布县'}, {
  admin_code: '540230',
  city_code: '98',
  id: '30',
  value: '康马县'
}, {admin_code: '540231', city_code: '98', id: '31', value: '定结县'}, {
  admin_code: '540232',
  city_code: '98',
  id: '32',
  value: '仲巴县'
}, {admin_code: '540233', city_code: '98', id: '33', value: '亚东县'}, {
  admin_code: '540234',
  city_code: '98',
  id: '34',
  value: '吉隆县'
}, {admin_code: '540235', city_code: '98', id: '35', value: '聂拉木县'}, {
  admin_code: '540236',
  city_code: '98',
  id: '36',
  value: '萨嘎县'
}, {admin_code: '540237', city_code: '98', id: '37', value: '岗巴县'}, {
  admin_code: '542523',
  city_code: '53',
  id: '23',
  value: '噶尔县'
}, {admin_code: '542521', city_code: '53', id: '21', value: '普兰县'}, {
  admin_code: '542522',
  city_code: '53',
  id: '22',
  value: '札达县'
}, {admin_code: '542524', city_code: '53', id: '24', value: '日土县'}, {
  admin_code: '542525',
  city_code: '53',
  id: '25',
  value: '革吉县'
}, {admin_code: '542526', city_code: '53', id: '26', value: '改则县'}, {
  admin_code: '542527',
  city_code: '53',
  id: '27',
  value: '措勤县'
}, {admin_code: '320305', city_code: '139', id: '05', value: '贾汪区'}, {
  admin_code: '320321',
  city_code: '139',
  id: '21',
  value: '丰县'
}, {admin_code: '320322', city_code: '139', id: '22', value: '沛县'}, {
  admin_code: '320324',
  city_code: '139',
  id: '24',
  value: '睢宁县'
}, {admin_code: '320382', city_code: '139', id: '82', value: '邳州市'}, {
  admin_code: '320381',
  city_code: '139',
  id: '81',
  value: '新沂市'
}, {admin_code: '320706', city_code: '251', id: '06', value: '海州区'}, {
  admin_code: '320723',
  city_code: '251',
  id: '23',
  value: '灌云县'
}, {admin_code: '320724', city_code: '251', id: '24', value: '灌南县'}, {
  admin_code: '320707',
  city_code: '251',
  id: '07',
  value: '赣榆区'
}, {admin_code: '320722', city_code: '251', id: '22', value: '东海县'}, {
  admin_code: '320803',
  city_code: '308',
  id: '03',
  value: '淮安区'
}, {admin_code: '320804', city_code: '308', id: '04', value: '淮阴区'}, {
  admin_code: '320813',
  city_code: '308',
  id: '13',
  value: '洪泽区'
}, {admin_code: '320826', city_code: '308', id: '26', value: '涟水县'}, {
  admin_code: '320831',
  city_code: '308',
  id: '31',
  value: '金湖县'
}, {admin_code: '320830', city_code: '308', id: '30', value: '盱眙县'}, {
  admin_code: '321302',
  city_code: '9',
  id: '02',
  value: '宿城区'
}, {admin_code: '321322', city_code: '9', id: '22', value: '沭阳县'}, {
  admin_code: '321323',
  city_code: '9',
  id: '23',
  value: '泗阳县'
}, {admin_code: '321324', city_code: '9', id: '24', value: '泗洪县'}, {
  admin_code: '320903',
  city_code: '309',
  id: '03',
  value: '盐都区'
}, {admin_code: '320904', city_code: '309', id: '04', value: '大丰区'}, {
  admin_code: '320981',
  city_code: '309',
  id: '81',
  value: '东台市'
}, {admin_code: '320924', city_code: '309', id: '24', value: '射阳县'}, {
  admin_code: '320923',
  city_code: '309',
  id: '23',
  value: '阜宁县'
}, {admin_code: '320922', city_code: '309', id: '22', value: '滨海县'}, {
  admin_code: '320921',
  city_code: '309',
  id: '21',
  value: '响水县'
}, {admin_code: '320925', city_code: '309', id: '25', value: '建湖县'}, {
  admin_code: '640104',
  city_code: '254',
  id: '04',
  value: '兴庆区'
}, {admin_code: '640106', city_code: '254', id: '06', value: '金凤区'}, {
  admin_code: '640105',
  city_code: '254',
  id: '05',
  value: '西夏区'
}, {admin_code: '640181', city_code: '254', id: '81', value: '灵武市'}, {
  admin_code: '640121',
  city_code: '254',
  id: '21',
  value: '永宁县'
}, {admin_code: '640122', city_code: '254', id: '22', value: '贺兰县'}, {
  admin_code: '640202',
  city_code: '73',
  id: '02',
  value: '大武口区'
}, {admin_code: '640221', city_code: '73', id: '21', value: '平罗县'}, {
  admin_code: '640205',
  city_code: '73',
  id: '05',
  value: '惠农区'
}, {admin_code: '640302', city_code: '72', id: '02', value: '利通区'}, {
  admin_code: '640381',
  city_code: '72',
  id: '81',
  value: '青铜峡市'
}, {admin_code: '640502', city_code: '292', id: '02', value: '沙坡头区'}, {
  admin_code: '640521',
  city_code: '292',
  id: '21',
  value: '中宁县'
}, {admin_code: '640323', city_code: '72', id: '23', value: '盐池县'}, {
  admin_code: '640324',
  city_code: '72',
  id: '24',
  value: '同心县'
}, {admin_code: '640402', city_code: '324', id: '02', value: '原州区'}, {
  admin_code: '640522',
  city_code: '292',
  id: '22',
  value: '海原县'
}, {admin_code: '640422', city_code: '324', id: '22', value: '西吉县'}, {
  admin_code: '640423',
  city_code: '324',
  id: '23',
  value: '隆德县'
}, {admin_code: '640424', city_code: '324', id: '24', value: '泾源县'}, {
  admin_code: '640425',
  city_code: '324',
  id: '25',
  value: '彭阳县'
}, {admin_code: '150302', city_code: '11', id: '02', value: '海勃湾区'}, {
  admin_code: '152921',
  city_code: '197',
  id: '21',
  value: '阿拉善左旗'
}, {admin_code: '610824', city_code: '109', id: '24', value: '靖边县'}, {
  admin_code: '610825',
  city_code: '109',
  id: '25',
  value: '定边县'
}, {admin_code: '370611', city_code: '198', id: '11', value: '福山区'}, {
  admin_code: '370613',
  city_code: '198',
  id: '13',
  value: '莱山区'
}, {admin_code: '370602', city_code: '198', id: '02', value: '芝罘区'}, {
  admin_code: '370612',
  city_code: '198',
  id: '12',
  value: '牟平区'
}, {admin_code: '370634', city_code: '198', id: '34', value: '长岛县'}, {
  admin_code: '370681',
  city_code: '198',
  id: '81',
  value: '龙口市'
}, {admin_code: '370686', city_code: '198', id: '86', value: '栖霞市'}, {
  admin_code: '371003',
  city_code: '10',
  id: '03',
  value: '文登区'
}, {admin_code: '370685', city_code: '198', id: '85', value: '招远市'}, {
  admin_code: '370684',
  city_code: '198',
  id: '84',
  value: '蓬莱市'
}, {admin_code: '371083', city_code: '10', id: '83', value: '乳山市'}, {
  admin_code: '370683',
  city_code: '198',
  id: '83',
  value: '莱州市'
}, {admin_code: '370687', city_code: '198', id: '87', value: '海阳市'}, {
  admin_code: '370682',
  city_code: '198',
  id: '82',
  value: '莱阳市'
}, {admin_code: '371082', city_code: '10', id: '82', value: '荣成市'}, {
  admin_code: '371002',
  city_code: '10',
  id: '02',
  value: '环翠区'
}, {admin_code: '410102', city_code: '110', id: '02', value: '中原区'}, {
  admin_code: '410103',
  city_code: '110',
  id: '03',
  value: '二七区'
}, {admin_code: '410104', city_code: '110', id: '04', value: '管城回族区'}, {
  admin_code: '410105',
  city_code: '110',
  id: '05',
  value: '金水区'
}, {admin_code: '410106', city_code: '110', id: '06', value: '上街区'}, {
  admin_code: '410108',
  city_code: '110',
  id: '08',
  value: '惠济区'
}, {admin_code: '410184', city_code: '110', id: '84', value: '新郑市'}, {
  admin_code: '411725',
  city_code: '176',
  id: '25',
  value: '确山县'
}, {admin_code: '410183', city_code: '110', id: '83', value: '新密市'}, {
  admin_code: '410181',
  city_code: '110',
  id: '81',
  value: '巩义市'
}, {admin_code: '410182', city_code: '110', id: '82', value: '荥阳市'}, {
  admin_code: '410122',
  city_code: '110',
  id: '22',
  value: '中牟县'
}, {admin_code: '411202', city_code: '85', id: '02', value: '湖滨区'}, {
  admin_code: '411281',
  city_code: '85',
  id: '81',
  value: '义马市'
}, {admin_code: '411282', city_code: '85', id: '82', value: '灵宝市'}, {
  admin_code: '411221',
  city_code: '85',
  id: '21',
  value: '渑池县'
}, {admin_code: '411203', city_code: '85', id: '03', value: '陕州区'}, {
  admin_code: '411224',
  city_code: '85',
  id: '24',
  value: '卢氏县'
}, {admin_code: '410303', city_code: '266', id: '03', value: '西工区'}, {
  admin_code: '410302',
  city_code: '266',
  id: '02',
  value: '老城区'
}, {admin_code: '410304', city_code: '266', id: '04', value: '瀍河回族区'}, {
  admin_code: '410305',
  city_code: '266',
  id: '05',
  value: '涧西区'
}, {admin_code: '410306', city_code: '266', id: '06', value: '吉利区'}, {
  admin_code: '410311',
  city_code: '266',
  id: '11',
  value: '洛龙区'
}, {admin_code: '410381', city_code: '266', id: '81', value: '偃师市'}, {
  admin_code: '410322',
  city_code: '266',
  id: '22',
  value: '孟津县'
}, {admin_code: '410323', city_code: '266', id: '23', value: '新安县'}, {
  admin_code: '410324',
  city_code: '266',
  id: '24',
  value: '栾川县'
}, {admin_code: '410325', city_code: '266', id: '25', value: '嵩县'}, {
  admin_code: '410326',
  city_code: '266',
  id: '26',
  value: '汝阳县'
}, {admin_code: '410327', city_code: '266', id: '27', value: '宜阳县'}, {
  admin_code: '410328',
  city_code: '266',
  id: '28',
  value: '洛宁县'
}, {admin_code: '410329', city_code: '266', id: '29', value: '伊川县'}, {
  admin_code: '410811',
  city_code: '162',
  id: '11',
  value: '山阳区'
}, {admin_code: '410802', city_code: '162', id: '02', value: '解放区'}, {
  admin_code: '410803',
  city_code: '162',
  id: '03',
  value: '中站区'
}, {admin_code: '410804', city_code: '162', id: '04', value: '马村区'}, {
  admin_code: '410883',
  city_code: '162',
  id: '83',
  value: '孟州市'
}, {admin_code: '410882', city_code: '162', id: '82', value: '沁阳市'}, {
  admin_code: '410821',
  city_code: '162',
  id: '21',
  value: '修武县'
}, {admin_code: '410822', city_code: '162', id: '22', value: '博爱县'}, {
  admin_code: '410823',
  city_code: '162',
  id: '23',
  value: '武陟县'
}, {admin_code: '410825', city_code: '162', id: '25', value: '温县'}, {
  admin_code: '410703',
  city_code: '230',
  id: '03',
  value: '卫滨区'
}, {admin_code: '410702', city_code: '230', id: '02', value: '红旗区'}, {
  admin_code: '410704',
  city_code: '230',
  id: '04',
  value: '凤泉区'
}, {admin_code: '410711', city_code: '230', id: '11', value: '牧野区'}, {
  admin_code: '410781',
  city_code: '230',
  id: '81',
  value: '卫辉市'
}, {admin_code: '410782', city_code: '230', id: '82', value: '辉县市'}, {
  admin_code: '410721',
  city_code: '230',
  id: '21',
  value: '新乡县'
}, {admin_code: '410724', city_code: '230', id: '24', value: '获嘉县'}, {
  admin_code: '410725',
  city_code: '230',
  id: '25',
  value: '原阳县'
}, {admin_code: '410726', city_code: '230', id: '26', value: '延津县'}, {
  admin_code: '410727',
  city_code: '230',
  id: '27',
  value: '封丘县'
}, {admin_code: '410728', city_code: '230', id: '28', value: '长垣县'}, {
  admin_code: '410611',
  city_code: '115',
  id: '11',
  value: '淇滨区'
}, {admin_code: '410603', city_code: '115', id: '03', value: '山城区'}, {
  admin_code: '410602',
  city_code: '115',
  id: '02',
  value: '鹤山区'
}, {admin_code: '410621', city_code: '115', id: '21', value: '浚县'}, {
  admin_code: '410622',
  city_code: '115',
  id: '22',
  value: '淇县'
}, {admin_code: '410503', city_code: '318', id: '03', value: '北关区'}, {
  admin_code: '410502',
  city_code: '318',
  id: '02',
  value: '文峰区'
}, {admin_code: '410505', city_code: '318', id: '05', value: '殷都区'}, {
  admin_code: '410506',
  city_code: '318',
  id: '06',
  value: '龙安区'
}, {admin_code: '410581', city_code: '318', id: '81', value: '林州市'}, {
  admin_code: '410522',
  city_code: '318',
  id: '22',
  value: '安阳县'
}, {admin_code: '410523', city_code: '318', id: '23', value: '汤阴县'}, {
  admin_code: '410526',
  city_code: '318',
  id: '26',
  value: '滑县'
}, {admin_code: '410527', city_code: '318', id: '27', value: '内黄县'}, {
  admin_code: '410902',
  city_code: '259',
  id: '02',
  value: '华龙区'
}, {admin_code: '410922', city_code: '259', id: '22', value: '清丰县'}, {
  admin_code: '410923',
  city_code: '259',
  id: '23',
  value: '南乐县'
}, {admin_code: '410926', city_code: '259', id: '26', value: '范县'}, {
  admin_code: '410927',
  city_code: '259',
  id: '27',
  value: '台前县'
}, {admin_code: '410928', city_code: '259', id: '28', value: '濮阳县'}, {
  admin_code: '410204',
  city_code: '267',
  id: '04',
  value: '鼓楼区'
}, {admin_code: '410202', city_code: '267', id: '02', value: '龙亭区'}, {
  admin_code: '410203',
  city_code: '267',
  id: '03',
  value: '顺河回族区'
}, {admin_code: '410205', city_code: '267', id: '05', value: '禹王台区'}, {
  admin_code: '410211',
  city_code: '267',
  id: '11',
  value: '金明区'
}, {admin_code: '410221', city_code: '267', id: '21', value: '杞县'}, {
  admin_code: '410222',
  city_code: '267',
  id: '22',
  value: '通许县'
}, {admin_code: '410223', city_code: '267', id: '23', value: '尉氏县'}, {
  admin_code: '410212',
  city_code: '267',
  id: '12',
  value: '祥符区'
}, {admin_code: '410225', city_code: '267', id: '25', value: '兰考县'}, {
  admin_code: '411402',
  city_code: '319',
  id: '02',
  value: '梁园区'
}, {admin_code: '411403', city_code: '319', id: '03', value: '睢阳区'}, {
  admin_code: '411481',
  city_code: '319',
  id: '81',
  value: '永城市'
}, {admin_code: '411425', city_code: '319', id: '25', value: '虞城县'}, {
  admin_code: '411421',
  city_code: '319',
  id: '21',
  value: '民权县'
}, {admin_code: '411423', city_code: '319', id: '23', value: '宁陵县'}, {
  admin_code: '411422',
  city_code: '319',
  id: '22',
  value: '睢县'
}, {admin_code: '411426', city_code: '319', id: '26', value: '夏邑县'}, {
  admin_code: '411424',
  city_code: '319',
  id: '24',
  value: '柘城县'
}, {admin_code: '411002', city_code: '38', id: '02', value: '魏都区'}, {
  admin_code: '411081',
  city_code: '38',
  id: '81',
  value: '禹州市'
}, {admin_code: '411082', city_code: '38', id: '82', value: '长葛市'}, {
  admin_code: '411003',
  city_code: '38',
  id: '03',
  value: '建安区'
}, {admin_code: '411024', city_code: '38', id: '24', value: '鄢陵县'}, {
  admin_code: '411025',
  city_code: '38',
  id: '25',
  value: '襄城县'
}, {admin_code: '411102', city_code: '25', id: '02', value: '源汇区'}, {
  admin_code: '411121',
  city_code: '25',
  id: '21',
  value: '舞阳县'
}, {admin_code: '411122', city_code: '25', id: '22', value: '临颍县'}, {
  admin_code: '411103',
  city_code: '25',
  id: '03',
  value: '郾城区'
}, {admin_code: '410402', city_code: '331', id: '02', value: '新华区'}, {
  admin_code: '410403',
  city_code: '331',
  id: '03',
  value: '卫东区'
}, {admin_code: '410411', city_code: '331', id: '11', value: '湛河区'}, {
  admin_code: '410404',
  city_code: '331',
  id: '04',
  value: '石龙区'
}, {admin_code: '410481', city_code: '331', id: '81', value: '舞钢市'}, {
  admin_code: '410482',
  city_code: '331',
  id: '82',
  value: '汝州市'
}, {admin_code: '410421', city_code: '331', id: '21', value: '宝丰县'}, {
  admin_code: '410422',
  city_code: '331',
  id: '22',
  value: '叶县'
}, {admin_code: '410423', city_code: '331', id: '23', value: '鲁山县'}, {
  admin_code: '410425',
  city_code: '331',
  id: '25',
  value: '郏县'
}, {admin_code: '411303', city_code: '5', id: '03', value: '卧龙区'}, {
  admin_code: '411302',
  city_code: '5',
  id: '02',
  value: '宛城区'
}, {admin_code: '411381', city_code: '5', id: '81', value: '邓州市'}, {
  admin_code: '411321',
  city_code: '5',
  id: '21',
  value: '南召县'
}, {admin_code: '411322', city_code: '5', id: '22', value: '方城县'}, {
  admin_code: '411323',
  city_code: '5',
  id: '23',
  value: '西峡县'
}, {admin_code: '411324', city_code: '5', id: '24', value: '镇平县'}, {
  admin_code: '411325',
  city_code: '5',
  id: '25',
  value: '内乡县'
}, {admin_code: '411326', city_code: '5', id: '26', value: '淅川县'}, {
  admin_code: '411327',
  city_code: '5',
  id: '27',
  value: '社旗县'
}, {admin_code: '411328', city_code: '5', id: '28', value: '唐河县'}, {
  admin_code: '411329',
  city_code: '5',
  id: '29',
  value: '新野县'
}, {admin_code: '411330', city_code: '5', id: '30', value: '桐柏县'}, {
  admin_code: '411502',
  city_code: '268',
  id: '02',
  value: '浉河区'
}, {admin_code: '411503', city_code: '268', id: '03', value: '平桥区'}, {
  admin_code: '411528',
  city_code: '268',
  id: '28',
  value: '息县'
}, {admin_code: '411527', city_code: '268', id: '27', value: '淮滨县'}, {
  admin_code: '411526',
  city_code: '268',
  id: '26',
  value: '潢川县'
}, {admin_code: '411522', city_code: '268', id: '22', value: '光山县'}, {
  admin_code: '411525',
  city_code: '268',
  id: '25',
  value: '固始县'
}, {admin_code: '411524', city_code: '268', id: '24', value: '商城县'}, {
  admin_code: '411521',
  city_code: '268',
  id: '21',
  value: '罗山县'
}, {admin_code: '411523', city_code: '268', id: '23', value: '新县'}, {
  admin_code: '411602',
  city_code: '289',
  id: '02',
  value: '川汇区'
}, {admin_code: '411681', city_code: '289', id: '81', value: '项城市'}, {
  admin_code: '411621',
  city_code: '289',
  id: '21',
  value: '扶沟县'
}, {admin_code: '411622', city_code: '289', id: '22', value: '西华县'}, {
  admin_code: '411623',
  city_code: '289',
  id: '23',
  value: '商水县'
}, {admin_code: '411627', city_code: '289', id: '27', value: '太康县'}, {
  admin_code: '411628',
  city_code: '289',
  id: '28',
  value: '鹿邑县'
}, {admin_code: '411625', city_code: '289', id: '25', value: '郸城县'}, {
  admin_code: '411626',
  city_code: '289',
  id: '26',
  value: '淮阳县'
}, {admin_code: '411624', city_code: '289', id: '24', value: '沈丘县'}, {
  admin_code: '411702',
  city_code: '176',
  id: '02',
  value: '驿城区'
}, {admin_code: '410185', city_code: '110', id: '85', value: '登封市'}, {
  admin_code: '411726',
  city_code: '176',
  id: '26',
  value: '泌阳县'
}, {admin_code: '411728', city_code: '176', id: '28', value: '遂平县'}, {
  admin_code: '411721',
  city_code: '176',
  id: '21',
  value: '西平县'
}, {admin_code: '411722', city_code: '176', id: '22', value: '上蔡县'}, {
  admin_code: '411727',
  city_code: '176',
  id: '27',
  value: '汝南县'
}, {admin_code: '411723', city_code: '176', id: '23', value: '平舆县'}, {
  admin_code: '411729',
  city_code: '176',
  id: '29',
  value: '新蔡县'
}, {admin_code: '411724', city_code: '176', id: '24', value: '正阳县'}, {
  admin_code: '419001',
  city_code: '162',
  id: '01',
  value: '济源市'
}, {admin_code: '210603', city_code: '45', id: '03', value: '振兴区'}, {
  admin_code: '210602',
  city_code: '45',
  id: '02',
  value: '元宝区'
}, {admin_code: '210604', city_code: '45', id: '04', value: '振安区'}, {
  admin_code: '210682',
  city_code: '45',
  id: '82',
  value: '凤城市'
}, {admin_code: '210681', city_code: '45', id: '81', value: '东港市'}, {
  admin_code: '210624',
  city_code: '45',
  id: '24',
  value: '宽甸满族自治县'
}, {admin_code: '210203', city_code: '314', id: '03', value: '西岗区'}, {
  admin_code: '210202',
  city_code: '314',
  id: '02',
  value: '中山区'
}, {admin_code: '210204', city_code: '314', id: '04', value: '沙河口区'}, {
  admin_code: '210211',
  city_code: '314',
  id: '11',
  value: '甘井子区'
}, {admin_code: '210212', city_code: '314', id: '12', value: '旅顺口区'}, {
  admin_code: '210213',
  city_code: '314',
  id: '13',
  value: '金州区'
}, {admin_code: '210281', city_code: '314', id: '81', value: '瓦房店市'}, {
  admin_code: '210214',
  city_code: '314',
  id: '14',
  value: '普兰店区'
}, {admin_code: '210283', city_code: '314', id: '83', value: '庄河市'}, {
  admin_code: '210224',
  city_code: '314',
  id: '24',
  value: '长海县'
}, {admin_code: '210802', city_code: '46', id: '02', value: '站前区'}, {
  admin_code: '210803',
  city_code: '46',
  id: '03',
  value: '西市区'
}, {admin_code: '210804', city_code: '46', id: '04', value: '鲅鱼圈区'}, {
  admin_code: '210811',
  city_code: '46',
  id: '11',
  value: '老边区'
}, {admin_code: '210882', city_code: '46', id: '82', value: '大石桥市'}, {
  admin_code: '210881',
  city_code: '46',
  id: '81',
  value: '盖州市'
}, {admin_code: '621025', city_code: '225', id: '25', value: '正宁县'}, {
  admin_code: '621026',
  city_code: '225',
  id: '26',
  value: '宁县'
}, {admin_code: '621021', city_code: '225', id: '21', value: '庆城县'}, {
  admin_code: '621002',
  city_code: '225',
  id: '02',
  value: '西峰区'
}, {admin_code: '621027', city_code: '225', id: '27', value: '镇原县'}, {
  admin_code: '621024',
  city_code: '225',
  id: '24',
  value: '合水县'
}, {admin_code: '621022', city_code: '225', id: '22', value: '环县'}, {
  admin_code: '621023',
  city_code: '225',
  id: '23',
  value: '华池县'
}, {admin_code: '610902', city_code: '169', id: '02', value: '汉滨区'}, {
  admin_code: '610603',
  city_code: '260',
  id: '03',
  value: '安塞区'
}, {admin_code: '610111', city_code: '71', id: '11', value: '灞桥区'}, {
  admin_code: '610929',
  city_code: '169',
  id: '29',
  value: '白河县'
}, {admin_code: '610527', city_code: '329', id: '27', value: '白水县'}, {
  admin_code: '610302',
  city_code: '70',
  id: '02',
  value: '渭滨区'
}, {admin_code: '610304', city_code: '70', id: '04', value: '陈仓区'}, {
  admin_code: '610103',
  city_code: '71',
  id: '03',
  value: '碑林区'
}, {admin_code: '610482', city_code: '320', id: '27', value: '彬州市'}, {
  admin_code: '610116',
  city_code: '71',
  id: '16',
  value: '长安区'
}, {admin_code: '610428', city_code: '320', id: '28', value: '长武县'}, {
  admin_code: '610722',
  city_code: '243',
  id: '22',
  value: '城固县'
}, {admin_code: '610525', city_code: '329', id: '25', value: '澄城县'}, {
  admin_code: '610430',
  city_code: '320',
  id: '30',
  value: '淳化县'
}, {admin_code: '610523', city_code: '329', id: '23', value: '大荔县'}, {
  admin_code: '611022',
  city_code: '21',
  id: '22',
  value: '丹凤县'
}, {admin_code: '610330', city_code: '70', id: '30', value: '凤县'}, {
  admin_code: '610322',
  city_code: '70',
  id: '22',
  value: '凤翔县'
}, {admin_code: '610730', city_code: '243', id: '30', value: '佛坪县'}, {
  admin_code: '610324',
  city_code: '70',
  id: '24',
  value: '扶风县'
}, {admin_code: '610822', city_code: '109', id: '22', value: '府谷县'}, {
  admin_code: '610528',
  city_code: '329',
  id: '28',
  value: '富平县'
}, {admin_code: '610628', city_code: '260', id: '28', value: '富县'}, {
  admin_code: '610627',
  city_code: '260',
  id: '27',
  value: '甘泉县'
}, {admin_code: '610117', city_code: '71', id: '17', value: '高陵区'}, {
  admin_code: '610581',
  city_code: '329',
  id: '81',
  value: '韩城市'
}, {admin_code: '610921', city_code: '169', id: '21', value: '汉阴县'}, {
  admin_code: '610702',
  city_code: '243',
  id: '02',
  value: '汉台区'
}, {admin_code: '610524', city_code: '329', id: '24', value: '合阳县'}, {
  admin_code: '610803',
  city_code: '109',
  id: '03',
  value: '横山区'
}, {admin_code: '610118', city_code: '71', id: '18', value: '鄠邑区'}, {
  admin_code: '610503',
  city_code: '329',
  id: '03',
  value: '华州区'
}, {admin_code: '610582', city_code: '329', id: '82', value: '华阴市'}, {
  admin_code: '610632',
  city_code: '260',
  id: '32',
  value: '黄陵县'
}, {admin_code: '610631', city_code: '260', id: '31', value: '黄龙县'}, {
  admin_code: '610828',
  city_code: '109',
  id: '28',
  value: '佳县'
}, {admin_code: '610423', city_code: '320', id: '23', value: '泾阳县'}, {
  admin_code: '610925',
  city_code: '169',
  id: '25',
  value: '岚皋县'
}, {admin_code: '610122', city_code: '71', id: '22', value: '蓝田县'}, {
  admin_code: '610425',
  city_code: '320',
  id: '25',
  value: '礼泉县'
}, {admin_code: '610104', city_code: '71', id: '04', value: '莲湖区'}, {
  admin_code: '610115',
  city_code: '71',
  id: '15',
  value: '临潼区'
}, {admin_code: '610329', city_code: '70', id: '29', value: '麟游县'}, {
  admin_code: '610729',
  city_code: '243',
  id: '29',
  value: '留坝县'
}, {admin_code: '610327', city_code: '70', id: '27', value: '陇县'}, {
  admin_code: '610727',
  city_code: '243',
  id: '27',
  value: '略阳县'
}, {admin_code: '610629', city_code: '260', id: '29', value: '洛川县'}, {
  admin_code: '611021',
  city_code: '21',
  id: '21',
  value: '洛南县'
}, {admin_code: '610326', city_code: '70', id: '26', value: '眉县'}, {
  admin_code: '610827',
  city_code: '109',
  id: '27',
  value: '米脂县'
}, {admin_code: '610725', city_code: '243', id: '25', value: '勉县'}, {
  admin_code: '610721',
  city_code: '243',
  id: '21',
  value: '南郑县'
}, {admin_code: '610726', city_code: '243', id: '26', value: '宁强县'}, {
  admin_code: '610923',
  city_code: '169',
  id: '23',
  value: '宁陕县'
}, {admin_code: '610926', city_code: '169', id: '26', value: '平利县'}, {
  admin_code: '610526',
  city_code: '329',
  id: '26',
  value: '蒲城县'
}, {admin_code: '610323', city_code: '70', id: '23', value: '岐山县'}, {
  admin_code: '610328',
  city_code: '70',
  id: '28',
  value: '千阳县'
}, {admin_code: '610424', city_code: '320', id: '24', value: '乾县'}, {
  admin_code: '610830',
  city_code: '109',
  id: '30',
  value: '清涧县'
}, {admin_code: '610422', city_code: '320', id: '22', value: '三原县'}, {
  admin_code: '611024',
  city_code: '21',
  id: '24',
  value: '山阳县'
}, {admin_code: '611023', city_code: '21', id: '23', value: '商南县'}, {
  admin_code: '611002',
  city_code: '21',
  id: '02',
  value: '商州区'
}, {admin_code: '610881', city_code: '109', id: '81', value: '神木市'}, {
  admin_code: '610922',
  city_code: '169',
  id: '22',
  value: '石泉县'
}, {admin_code: '610826', city_code: '109', id: '26', value: '绥德县'}, {
  admin_code: '610331',
  city_code: '70',
  id: '31',
  value: '太白县'
}, {admin_code: '610203', city_code: '31', id: '03', value: '印台区'}, {
  admin_code: '610522',
  city_code: '329',
  id: '22',
  value: '潼关县'
}, {admin_code: '610112', city_code: '71', id: '12', value: '未央区'}, {
  admin_code: '610502',
  city_code: '329',
  id: '02',
  value: '临渭区'
}, {admin_code: '610829', city_code: '109', id: '29', value: '吴堡县'}, {
  admin_code: '610626',
  city_code: '260',
  id: '26',
  value: '吴起县'
}, {admin_code: '610431', city_code: '320', id: '31', value: '武功县'}, {
  admin_code: '610724',
  city_code: '243',
  id: '24',
  value: '西乡县'
}, {admin_code: '610404', city_code: '320', id: '04', value: '渭城区'}, {
  admin_code: '610102',
  city_code: '71',
  id: '02',
  value: '新城区'
}, {admin_code: '610481', city_code: '320', id: '81', value: '兴平市'}, {
  admin_code: '610928',
  city_code: '169',
  id: '28',
  value: '旬阳县'
}, {admin_code: '610429', city_code: '320', id: '29', value: '旬邑县'}, {
  admin_code: '610602',
  city_code: '260',
  id: '02',
  value: '宝塔区'
}, {admin_code: '610622', city_code: '260', id: '22', value: '延川县'}, {
  admin_code: '610114',
  city_code: '71',
  id: '14',
  value: '阎良区'
}, {admin_code: '610113', city_code: '71', id: '13', value: '雁塔区'}, {
  admin_code: '610403',
  city_code: '320',
  id: '03',
  value: '杨陵区'
}, {admin_code: '610723', city_code: '243', id: '23', value: '洋县'}, {
  admin_code: '610204',
  city_code: '31',
  id: '04',
  value: '耀州区'
}, {admin_code: '610630', city_code: '260', id: '30', value: '宜川县'}, {
  admin_code: '610222',
  city_code: '31',
  id: '22',
  value: '宜君县'
}, {admin_code: '610426', city_code: '320', id: '26', value: '永寿县'}, {
  admin_code: '610802',
  city_code: '109',
  id: '02',
  value: '榆阳区'
}, {admin_code: '611025', city_code: '21', id: '25', value: '镇安县'}, {
  admin_code: '610728',
  city_code: '243',
  id: '28',
  value: '镇巴县'
}, {admin_code: '610927', city_code: '169', id: '27', value: '镇坪县'}, {
  admin_code: '610625',
  city_code: '260',
  id: '25',
  value: '志丹县'
}, {admin_code: '610124', city_code: '71', id: '24', value: '周至县'}, {
  admin_code: '610623',
  city_code: '260',
  id: '23',
  value: '子长县'
}, {admin_code: '610831', city_code: '109', id: '31', value: '子洲县'}, {
  admin_code: '610924',
  city_code: '169',
  id: '24',
  value: '紫阳县'
}, {admin_code: '611026', city_code: '21', id: '26', value: '柞水县'}, {
  admin_code: '320102',
  city_code: '210',
  id: '02',
  value: '玄武区'
}, {admin_code: '320104', city_code: '210', id: '04', value: '秦淮区'}, {
  admin_code: '320105',
  city_code: '210',
  id: '05',
  value: '建邺区'
}, {admin_code: '320106', city_code: '210', id: '06', value: '鼓楼区'}, {
  admin_code: '320111',
  city_code: '210',
  id: '11',
  value: '浦口区'
}, {admin_code: '320116', city_code: '210', id: '16', value: '六合区'}, {
  admin_code: '320113',
  city_code: '210',
  id: '13',
  value: '栖霞区'
}, {admin_code: '320114', city_code: '210', id: '14', value: '雨花台区'}, {
  admin_code: '320115',
  city_code: '210',
  id: '15',
  value: '江宁区'
}, {admin_code: '320117', city_code: '210', id: '17', value: '溧水区'}, {
  admin_code: '320118',
  city_code: '210',
  id: '18',
  value: '高淳区'
}, {admin_code: '321203', city_code: '131', id: '03', value: '高港区'}, {
  admin_code: '321282',
  city_code: '131',
  id: '82',
  value: '靖江市'
}, {admin_code: '321283', city_code: '131', id: '83', value: '泰兴市'}, {
  admin_code: '321204',
  city_code: '131',
  id: '04',
  value: '姜堰区'
}, {admin_code: '321281', city_code: '131', id: '81', value: '兴化市'}, {
  admin_code: '321002',
  city_code: '74',
  id: '02',
  value: '广陵区'
}, {admin_code: '321003', city_code: '74', id: '03', value: '邗江区'}, {
  admin_code: '321081',
  city_code: '74',
  id: '81',
  value: '仪征市'
}, {admin_code: '321012', city_code: '74', id: '12', value: '江都区'}, {
  admin_code: '321084',
  city_code: '74',
  id: '84',
  value: '高邮市'
}, {admin_code: '321023', city_code: '74', id: '23', value: '宝应县'}, {
  admin_code: '321111',
  city_code: '101',
  id: '11',
  value: '润州区'
}, {admin_code: '321112', city_code: '101', id: '12', value: '丹徒区'}, {
  admin_code: '321181',
  city_code: '101',
  id: '81',
  value: '丹阳市'
}, {admin_code: '321182', city_code: '101', id: '82', value: '扬中市'}, {
  admin_code: '321183',
  city_code: '101',
  id: '83',
  value: '句容市'
}, {admin_code: '371402', city_code: '7', id: '02', value: '德城区'}, {
  admin_code: '420115',
  city_code: '234',
  id: '15',
  value: '江夏区'
}, {admin_code: '500110', city_code: '3', id: '10', value: '綦江区'}, {
  admin_code: '500111',
  city_code: '3',
  id: '11',
  value: '大足区'
}, {admin_code: '232702', city_code: '96', id: '01', value: '加格达奇'}, {
  admin_code: '360482',
  city_code: '135',
  id: '82',
  value: '共青城市'
}, {admin_code: '130209', city_code: '118', id: '09', value: '曹妃甸区'}, {
  admin_code: '511903',
  city_code: '63',
  id: '03',
  value: '恩阳区'
}, {admin_code: '320508', city_code: '227', id: '08', value: '姑苏区'}, {
  admin_code: '511603',
  city_code: '40',
  id: '03',
  value: '前锋区'
}, {admin_code: '421321', city_code: '297', id: '21', value: '随县'}, {
  admin_code: '340506',
  city_code: '333',
  id: '06',
  value: '博望区'
}, {admin_code: '450903', city_code: '127', id: '03', value: '福绵区'}, {
  admin_code: '450406',
  city_code: '88',
  id: '06',
  value: '龙圩区'
}, {admin_code: '542431', city_code: '265', id: '31', value: '双湖县'}, {
  admin_code: '150703',
  city_code: '95',
  id: '03',
  value: '扎赉诺尔区'
}, {admin_code: '460205', city_code: '1', id: '05', value: '崖州区'}, {
  admin_code: '460204',
  city_code: '1',
  id: '04',
  value: '天涯区'
}, {admin_code: '460203', city_code: '1', id: '03', value: '吉阳区'}, {
  admin_code: '460202',
  city_code: '1',
  id: '02',
  value: '海棠区'
}, {admin_code: '652702', city_code: '281', id: '02', value: '阿拉山口市'}, {
  admin_code: '654004',
  city_code: '87',
  id: '04',
  value: '霍尔果斯市'
}, {admin_code: '659007', city_code: '47', id: '07', value: '双河市'}, {
  admin_code: '659006',
  city_code: '315',
  id: '06',
  value: '铁门关市'
}, {admin_code: '341504', city_code: '136', id: '04', value: '叶集区'}, {
  admin_code: '320214',
  city_code: '342',
  id: '14',
  value: '新吴区'
}, {admin_code: '460300', city_code: '138', id: '00', value: '三沙市'}, {
  admin_code: '451103',
  city_code: '199',
  id: '03',
  value: '平桂区'
}, {admin_code: '150603', city_code: '245', id: '03', value: '康巴什区'}, {
  admin_code: '440309',
  city_code: '290',
  id: '09',
  value: '龙华区'
}, {admin_code: '440310', city_code: '290', id: '10', value: '坪山区'}, {
  admin_code: '659005',
  city_code: '346',
  id: '05',
  value: '北屯市'
}, {admin_code: '659008', city_code: '224', id: '08', value: '可克达拉市'}, {
  admin_code: '440311',
  city_code: '290',
  id: '12',
  value: '光明区'
}, {admin_code: '130284', city_code: '118', id: '84', value: '滦州市'}, {
  admin_code: '140403',
  city_code: '311',
  id: '03',
  value: '潞州区'
}, {admin_code: '140404', city_code: '311', id: '04', value: '上党区'}, {
  admin_code: '140405',
  city_code: '311',
  id: '05',
  value: '屯留区'
}, {admin_code: '140406', city_code: '311', id: '06', value: '潞城区'}, {
  admin_code: '330112',
  city_code: '23',
  id: '12',
  value: '临安区'
}, {admin_code: '350527', city_code: '276', id: '27', value: '金门县'}, {
  admin_code: '360404',
  city_code: '135',
  id: '04',
  value: '柴桑区'
}, {admin_code: '370116', city_code: '249', id: '15', value: '莱芜区'}, {
  admin_code: '370117',
  city_code: '249',
  id: '16',
  value: '钢城区'
}, {admin_code: '370215', city_code: '336', id: '15', value: '即墨区'}, {
  admin_code: '460321',
  city_code: '138',
  id: '21',
  value: '西沙群岛'
}, {admin_code: '460322', city_code: '138', id: '22', value: '南沙群岛'}, {
  admin_code: '460323',
  city_code: '138',
  id: '23',
  value: '中沙群岛'
}, {admin_code: '460324', city_code: '138', id: '24', value: '东沙群岛'}, {
  admin_code: '500155',
  city_code: '3',
  id: '55',
  value: '梁平区'
}, {admin_code: '511504', city_code: '300', id: '04', value: '叙州区'}, {
  admin_code: '610703',
  city_code: '243',
  id: '03',
  value: '南郑区'
}, {admin_code: '632800', city_code: '125', id: '00', value: '海西蒙古族藏族自治州'}, {
  admin_code: '659009',
  city_code: '347',
  id: '09',
  value: '昆玉市'
}, {admin_code: '350213', city_code: '203', id: '13', value: '翔安区'}, {
  admin_code: '350505',
  city_code: '276',
  id: '05',
  value: '泉港区'
}, {admin_code: '230203', city_code: '226', id: '03', value: '建华区'}, {
  admin_code: '230204',
  city_code: '226',
  id: '04',
  value: '铁锋区'
}, {admin_code: '230205', city_code: '226', id: '05', value: '昂昂溪区'}, {
  admin_code: '230206',
  city_code: '226',
  id: '06',
  value: '富拉尔基区'
}, {admin_code: '230207', city_code: '226', id: '07', value: '碾子山区'}, {
  admin_code: '230208',
  city_code: '226',
  id: '08',
  value: '梅里斯达斡尔族区'
}, {admin_code: '320303', city_code: '139', id: '03', value: '云龙区'}, {
  admin_code: '320311',
  city_code: '139',
  id: '11',
  value: '泉山区'
}, {admin_code: '320302', city_code: '139', id: '02', value: '鼓楼区'}, {
  admin_code: '320312',
  city_code: '139',
  id: '12',
  value: '铜山区'
}, {admin_code: '621222', city_code: '52', id: '22', value: '文县'}, {
  admin_code: '540302',
  city_code: '2',
  id: '02',
  value: '卡若区'
}, {admin_code: '610621', city_code: '260', id: '21', value: '延长县'}, {
  admin_code: '430721',
  city_code: '261',
  id: '21',
  value: '安乡县'
}, {admin_code: '150702', city_code: '95', id: '02', value: '海拉尔区'}, {
  admin_code: '150781',
  city_code: '95',
  id: '81',
  value: '满洲里市'
}, {admin_code: '150782', city_code: '95', id: '82', value: '牙克石市'}, {
  admin_code: '150721',
  city_code: '95',
  id: '21',
  value: '阿荣旗'
}, {admin_code: '150783', city_code: '95', id: '83', value: '扎兰屯市'}, {
  admin_code: '150784',
  city_code: '95',
  id: '84',
  value: '额尔古纳市'
}, {admin_code: '232703', city_code: '96', id: '03', value: '新林区'}, {
  admin_code: '232704',
  city_code: '96',
  id: '04',
  value: '呼中区'
}, {admin_code: '360821', city_code: '283', id: '21', value: '吉安县'}, {
  admin_code: '361121',
  city_code: '216',
  id: '21',
  value: '上饶县'
}, {admin_code: '152923', city_code: '197', id: '23', value: '额济纳旗'}, {
  admin_code: '610303',
  city_code: '70',
  id: '03',
  value: '金台区'
}, {admin_code: '130803', city_code: '157', id: '03', value: '双滦区'}, {
  admin_code: '130804',
  city_code: '157',
  id: '04',
  value: '鹰手营子矿区'
}, {admin_code: '130702', city_code: '156', id: '02', value: '桥东区'}, {
  admin_code: '130706',
  city_code: '156',
  id: '06',
  value: '下花园区'
}, {admin_code: '130902', city_code: '165', id: '02', value: '新华区'}, {
  admin_code: '130921',
  city_code: '165',
  id: '21',
  value: '沧县'
}, {admin_code: '130705', city_code: '156', id: '05', value: '宣化区'}, {
  admin_code: '320611',
  city_code: '217',
  id: '11',
  value: '港闸区'
}, {admin_code: '320402', city_code: '130', id: '02', value: '天宁区'}, {
  admin_code: '320405',
  city_code: '133',
  id: '05',
  value: '戚墅堰区'
}, {admin_code: '320411', city_code: '130', id: '11', value: '新北区'}, {
  admin_code: '320412',
  city_code: '130',
  id: '12',
  value: '武进区'
}, {admin_code: '320213', city_code: '342', id: '13', value: '梁溪区'}, {
  admin_code: '320204',
  city_code: '341',
  id: '04',
  value: '北塘区'
}, {admin_code: '320206', city_code: '342', id: '06', value: '惠山区'}, {
  admin_code: '320205',
  city_code: '342',
  id: '05',
  value: '锡山区'
}, {admin_code: '320505', city_code: '227', id: '05', value: '虎丘区'}, {
  admin_code: '320506',
  city_code: '227',
  id: '06',
  value: '吴中区'
}, {admin_code: '320507', city_code: '227', id: '07', value: '相城区'}, {
  admin_code: '321102',
  city_code: '101',
  id: '02',
  value: '京口区'
}, {admin_code: '321202', city_code: '131', id: '02', value: '海陵区'}, {
  admin_code: '370702',
  city_code: '295',
  id: '02',
  value: '潍城区'
}, {admin_code: '370703', city_code: '295', id: '03', value: '寒亭区'}, {
  admin_code: '370704',
  city_code: '295',
  id: '04',
  value: '坊子区'
}, {admin_code: '371103', city_code: '178', id: '03', value: '岚山区'}, {
  admin_code: '370802',
  city_code: '148',
  id: '02',
  value: '市中区'
}, {admin_code: '370402', city_code: '272', id: '02', value: '市中区'}, {
  admin_code: '370403',
  city_code: '272',
  id: '03',
  value: '薛城区'
}, {admin_code: '370404', city_code: '272', id: '04', value: '峄城区'}, {
  admin_code: '371302',
  city_code: '339',
  id: '02',
  value: '兰山区'
}, {admin_code: '371311', city_code: '339', id: '11', value: '罗庄区'}, {
  admin_code: '320812',
  city_code: '308',
  id: '12',
  value: '清江浦区'
}, {admin_code: '320811', city_code: '308', id: '11', value: '清浦区'}, {
  admin_code: '320902',
  city_code: '309',
  id: '02',
  value: '亭湖区'
}, {admin_code: '320705', city_code: '250', id: '05', value: '新浦区'}, {
  admin_code: '320703',
  city_code: '251',
  id: '03',
  value: '连云区'
}, {admin_code: '360803', city_code: '283', id: '03', value: '青原区'}, {
  admin_code: '610202',
  city_code: '31',
  id: '02',
  value: '王益区'
}, {admin_code: '654021', city_code: '87', id: '21', value: '伊宁县'}, {
  admin_code: '150303',
  city_code: '11',
  id: '03',
  value: '海南区'
}, {admin_code: '150304', city_code: '11', id: '04', value: '乌达区'}, {
  admin_code: '440204',
  city_code: '321',
  id: '04',
  value: '浈江区'
}, {admin_code: '320211', city_code: '342', id: '11', value: '滨湖区'}, {
  admin_code: '370911',
  city_code: '195',
  id: '11',
  value: '岱岳区'
}, {admin_code: '321311', city_code: '9', id: '11', value: '宿豫区'}, {
  admin_code: '610402',
  city_code: '320',
  id: '02',
  value: '秦都区'
}, {admin_code: '653221', city_code: '65', id: '21', value: '和田县'}, {
  admin_code: '450503',
  city_code: '37',
  id: '03',
  value: '银海区'
}, {admin_code: '450512', city_code: '37', id: '12', value: '铁山港区'}, {
  admin_code: '450203',
  city_code: '13',
  id: '03',
  value: '鱼峰区'
}, {admin_code: '450204', city_code: '13', id: '04', value: '柳南区'}, {
  admin_code: '450205',
  city_code: '13',
  id: '05',
  value: '柳北区'
}, {admin_code: '450303', city_code: '100', id: '03', value: '叠彩区'}, {
  admin_code: '450302',
  city_code: '100',
  id: '02',
  value: '秀峰区'
}, {admin_code: '450305', city_code: '100', id: '05', value: '七星区'}, {
  admin_code: '450311',
  city_code: '100',
  id: '11',
  value: '雁山区'
}, {admin_code: '450404', city_code: '88', id: '04', value: '蝶山区'}, {
  admin_code: '450405',
  city_code: '88',
  id: '05',
  value: '长洲区'
}, {admin_code: '450803', city_code: '215', id: '03', value: '港南区'}, {
  admin_code: '450804',
  city_code: '215',
  id: '04',
  value: '覃塘区'
}, {admin_code: '450703', city_code: '134', id: '03', value: '钦北区'}, {
  admin_code: '450603',
  city_code: '214',
  id: '03',
  value: '防城区'
}, {admin_code: '520303', city_code: '58', id: '03', value: '汇川区'}, {
  admin_code: '430703',
  city_code: '261',
  id: '03',
  value: '鼎城区'
}, {admin_code: '430902', city_code: '252', id: '02', value: '资阳区'}, {
  admin_code: '430611',
  city_code: '263',
  id: '11',
  value: '君山区'
}, {admin_code: '430603', city_code: '263', id: '03', value: '云溪区'}, {
  admin_code: '430211',
  city_code: '231',
  id: '11',
  value: '天元区'
}, {admin_code: '430203', city_code: '231', id: '03', value: '芦淞区'}, {
  admin_code: '430204',
  city_code: '231',
  id: '04',
  value: '石峰区'
}, {admin_code: '430304', city_code: '150', id: '04', value: '岳塘区'}, {
  admin_code: '430405',
  city_code: '326',
  id: '05',
  value: '珠晖区'
}, {admin_code: '430407', city_code: '326', id: '07', value: '石鼓区'}, {
  admin_code: '430408',
  city_code: '326',
  id: '08',
  value: '蒸湘区'
}, {admin_code: '430412', city_code: '326', id: '12', value: '南岳区'}, {
  admin_code: '431003',
  city_code: '209',
  id: '03',
  value: '苏仙区'
}, {admin_code: '431103', city_code: '159', id: '03', value: '冷水滩区'}, {
  admin_code: '430502',
  city_code: '275',
  id: '02',
  value: '双清区'
}, {admin_code: '430511', city_code: '275', id: '11', value: '北塔区'}, {
  admin_code: '150785',
  city_code: '95',
  id: '85',
  value: '根河市'
}, {admin_code: '411104', city_code: '25', id: '04', value: '召陵区'}, {
  admin_code: '430811',
  city_code: '39',
  id: '11',
  value: '武陵源区'
}, {admin_code: '620502', city_code: '218', id: '02', value: '秦州区'}, {
  admin_code: '520402',
  city_code: '253',
  id: '02',
  value: '西秀区'
}, {admin_code: '440902', city_code: '22', id: '02', value: '茂南区'}, {
  admin_code: '440903',
  city_code: '21',
  id: '03',
  value: '茂港区'
}, {admin_code: '440115', city_code: '294', id: '15', value: '南沙区'}, {
  admin_code: '340208',
  city_code: '244',
  id: '08',
  value: '三山区'
}, {admin_code: '120116', city_code: '291', id: '16', value: '滨海新区'}, {
  admin_code: '640303',
  city_code: '72',
  id: '03',
  value: '红寺堡区'
}, {admin_code: '441203', city_code: '278', id: '03', value: '鼎湖区'}, {
  admin_code: '441202',
  city_code: '278',
  id: '02',
  value: '端州区'
}, {admin_code: '441284', city_code: '278', id: '84', value: '四会市'}, {
  admin_code: '445281',
  city_code: '279',
  id: '81',
  value: '普宁市'
}, {admin_code: '110114', city_code: '338', id: '14', value: '昌平区'}, {
  admin_code: '110105',
  city_code: '338',
  id: '05',
  value: '朝阳区'
}, {admin_code: '110115', city_code: '338', id: '15', value: '大兴区'}, {
  admin_code: '110101',
  city_code: '338',
  id: '01',
  value: '东城区'
}, {admin_code: '110111', city_code: '338', id: '11', value: '房山区'}, {
  admin_code: '110106',
  city_code: '338',
  id: '06',
  value: '丰台区'
}, {admin_code: '110108', city_code: '338', id: '08', value: '海淀区'}, {
  admin_code: '110116',
  city_code: '338',
  id: '16',
  value: '怀柔区'
}, {admin_code: '110109', city_code: '338', id: '09', value: '门头沟区'}, {
  admin_code: '110118',
  city_code: '338',
  id: '18',
  value: '密云区'
}, {admin_code: '110117', city_code: '338', id: '17', value: '平谷区'}, {
  admin_code: '110107',
  city_code: '338',
  id: '07',
  value: '石景山区'
}, {admin_code: '110113', city_code: '338', id: '13', value: '顺义区'}, {
  admin_code: '110112',
  city_code: '338',
  id: '12',
  value: '通州区'
}, {admin_code: '110102', city_code: '338', id: '02', value: '西城区'}, {
  admin_code: '110119',
  city_code: '338',
  id: '19',
  value: '延庆区'
}, {admin_code: '130703', city_code: '156', id: '03', value: '桥西区'}, {
  admin_code: '130721',
  city_code: '155',
  id: '21',
  value: '宣化县'
}, {admin_code: '130722', city_code: '156', id: '22', value: '张北县'}, {
  admin_code: '130723',
  city_code: '156',
  id: '23',
  value: '康保县'
}, {admin_code: '130724', city_code: '156', id: '24', value: '沽源县'}, {
  admin_code: '130725',
  city_code: '156',
  id: '25',
  value: '尚义县'
}, {admin_code: '130726', city_code: '156', id: '26', value: '蔚县'}, {
  admin_code: '130727',
  city_code: '156',
  id: '27',
  value: '阳原县'
}, {admin_code: '130728', city_code: '156', id: '28', value: '怀安县'}, {
  admin_code: '130708',
  city_code: '156',
  id: '08',
  value: '万全区'
}, {admin_code: '130730', city_code: '156', id: '30', value: '怀来县'}, {
  admin_code: '130731',
  city_code: '156',
  id: '31',
  value: '涿鹿县'
}, {admin_code: '130732', city_code: '156', id: '32', value: '赤城县'}, {
  admin_code: '130709',
  city_code: '156',
  id: '09',
  value: '崇礼区'
}, {admin_code: '130802', city_code: '157', id: '02', value: '双桥区'}, {
  admin_code: '130821',
  city_code: '157',
  id: '21',
  value: '承德县'
}, {admin_code: '130822', city_code: '157', id: '22', value: '兴隆县'}, {
  admin_code: '130881',
  city_code: '157',
  id: '81',
  value: '平泉市'
}, {admin_code: '130824', city_code: '157', id: '24', value: '滦平县'}, {
  admin_code: '130825',
  city_code: '157',
  id: '25',
  value: '隆化县'
}, {admin_code: '130826', city_code: '157', id: '26', value: '丰宁满族自治县'}, {
  admin_code: '130827',
  city_code: '157',
  id: '27',
  value: '宽城满族自治县'
}, {admin_code: '130828', city_code: '157', id: '28', value: '围场满族蒙古族自治县'}];

const areaData = {
  province,
  city,
  area
};
export default areaData;
