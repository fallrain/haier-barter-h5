import region from './region';

const data = {
  name: 'province',
  label: '请选择',
  options: []
};
region.province.forEach((province) => {
  // data.options.push();
  const provinceId = province.id;
  const provinceData = {
    value: provinceId,
    label: province.value,
    children: {
      name: 'city',
      label: '请选择',
      options: []
    }
  };
  const citys = provinceData.children.options;
  region.city.forEach((city) => {
    const cityId = city.id;
    if (city.pro_code === provinceId) {
      const cityData = {
        value: cityId,
        label: city.value,
        children: {
          name: 'country',
          label: '请选择',
          options: []
        }
      };
      citys.push(cityData);
      const countrys = cityData.children.options;
      region.area.forEach((country) => {
        if (country.city_code === cityId) {
          countrys.push({
            value: country.id,
            label: country.value,
            areaCode: country.country
          });
        }
      });
    }
  });

  data.options.push(provinceData);
});
/* const data1 = {
  name: 'province',
  label: '请选择',
  options: [
    {
      value: 'pk',
      label: '北京市',
      children: {
        name: 'block',
        label: '请选择',
        options: [
          {
            value: 'hd',
            label: '海淀区'
          },
          {
            value: 'cp',
            label: '昌平区'
          },
          {
            value: 'cy',
            label: '朝阳区'
          }
        ]
      }
    },
    {
      value: 'sc',
      label: '四川省',
      children: {
        name: 'city',
        label: '请选择',
        options: [
          {
            value: 'cd',
            label: '成都市',
            children: {
              name: 'block',
              label: '请选择',
              options: [
                {
                  value: 'gx',
                  label: '高新区'
                },
                {
                  value: 'qy',
                  label: '青羊区'
                }
              ]
            }
          },
          {
            value: 'my',
            label: '绵阳市',
            children: {
              name: 'block',
              label: '请选择',
              options: [
                {
                  value: 'jn',
                  label: '金牛区'
                }
              ]
            }
          },
          {
            value: 'lz',
            label: '泸州市'
          },
          {
            value: 'dy',
            label: '德阳市'
          },
          {
            value: 'ms',
            label: '眉山市'
          },
          {
            value: 'ls',
            label: '乐山市'
          },
          {
            value: 'yb',
            label: '宜宾市'
          },
          {
            value: 'ya',
            label: '雅安市'
          },
          {
            value: 'zg',
            label: '自贡市'
          },
          {
            value: 'pzh',
            label: '攀枝花市'
          },
          {
            value: 'sn',
            label: '遂宁市'
          },
          {
            value: 'nc',
            label: '南充市'
          },
          {
            value: 'nj',
            label: '内江市'
          },
          {
            value: 'dz',
            label: '达州市'
          },
          {
            value: 'ga',
            label: '广安市'
          }
        ]
      }
    }
  ]
}; */

export default data;
