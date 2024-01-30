const sampleData = [

    {
        model: 'Model1',
        make: 'Company1',
        yearofmanufacture: new Date().toLocaleDateString(),
        vehicleID: 'V1',
        licenseNo: 'LicenseNo-1',
        mileage: '10000',

        dateofservice: new Date().toLocaleDateString(),
        mileageatservice: '10000',
        workperformed: ['oil change', 'Repalce oil filter'],
        performedby: 'mechanic 1',
        cost: '15000',
        receipt: 'receipt 1',
        note: 'none',

      },

      {
        model: 'Model2',
        make: 'Company2',
        yearofmanufacture: new Date().toLocaleDateString(),
        vehicleID: 'V2',
        licenseNo: 'LicenseNo-2',
        mileage: '10002',

        dateofservice: new Date().toLocaleDateString(),
        mileageatservice: '10002',
        workperformed: ['oil change'],
        performedby: 'mechanic 2',
        cost: '5000',
        receipt: 'receipt 2',
        note: 'none',
      },
      
      {
        model: 'Model3',
        make: 'Company3',
        yearofmanufacture: new Date().toLocaleDateString(),
        vehicleID: 'V3',
        licenseNo: 'LicenseNo-3',
        mileage: '10003',

        dateofservice: new Date().toLocaleDateString(),
        mileageatservice: '10003',
        workperformed: ['oil change', 'Repalce oil filter', 'Breake oil change' ],
        performedby: 'mechanic 3',
        cost: '25000',
        receipt: 'receipt 3',
        note: 'covered under waranty',
      },
];

export default sampleData;