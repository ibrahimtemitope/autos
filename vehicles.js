// =========================================================
//  UNIQUE ALLIOSH — VEHICLE CATALOG
//  Real automobile photography (Unsplash). Prices in Naira.
// =========================================================
const IMG = {
    sClass:   '/images/vehicles/01-mercedes-c63.png',
    bmwSedan: '/images/vehicles/03-bmw-m440i.png',
    landCruiser:'/images/vehicles/09-toyota-landcruiser.png',
    rangeRover:'/images/vehicles/07-range-rover-sport.png',
    lexus:    '/images/vehicles/06-lexus-lx600.png',
    porsche:  '/images/vehicles/05-porsche-911-carrera.png',
    camry:    '/images/vehicles/02-tesla-model-s.png',
    accord:   '/images/vehicles/16-genesis-g90.png',
    fordTruck:'/images/vehicles/17-cadillac-ct6.png',
    hilux:    '/images/vehicles/22-hennessey-venom.png',
    gwagon:   '/images/vehicles/04-audi-rs-e-tron.png',
    audiQ7:   '/images/vehicles/08-infiniti-qx80.png',
    tesla:    '/images/vehicles/02-tesla-model-s.png',
    lambo:    '/images/vehicles/13-lamborghini-urus.png',
    bentley:  '/images/vehicles/11-bentley-flying-spur.png',
    corolla:  '/images/vehicles/12-maserati-quattroporte.png',
    jeep:     '/images/vehicles/18-polestar-3.png',
    corvette: '/images/vehicles/19-mclaren-artura.png',
    patrol:   '/images/vehicles/10-rolls-royce-ghost.png',
    bmwX7:    '/images/vehicles/14-ferrari-sf90.png',
    rolls:    '/images/vehicles/21-bugatti-chiron.png',
    mustang:  '/images/vehicles/15-jaguar-xj.png',
    interior: '/images/vehicles/20-pagani-utopia.png',
    interior2:'/images/vehicles/01-mercedes-c63.png',
    wheel:    '/images/vehicles/03-bmw-m440i.png'
};

const products = [
    { id:1, name:'Mercedes-Benz S 580 4MATIC (2023)', category:'luxury', brand:'Mercedes-Benz', price:185000000, oldPrice:210000000,
      image:IMG.sClass, gallery:[IMG.sClass, IMG.interior, IMG.wheel], condition:'Foreign Used', rating:5.0, reviews:24, badge:'sale',
      desc:'The pinnacle of luxury motoring. Burmester 4D sound, rear executive seating, MBUX augmented reality. Single owner, full service history, accident-free. Direct tokunbo from Germany.',
      specs:{ 'Year':'2023', 'Mileage':'18,400 km', 'Engine':'4.0L V8 BiTurbo', 'Transmission':'9G-TRONIC Auto', 'Drivetrain':'4MATIC AWD', 'Fuel':'Petrol' } },

    { id:2, name:'BMW M5 Competition (2022)', category:'sports', brand:'BMW', price:142000000, oldPrice:0,
      image:IMG.bmwSedan, gallery:[IMG.bmwSedan, IMG.interior2, IMG.wheel], condition:'Foreign Used', rating:4.9, reviews:31, badge:'certified',
      desc:'617hp twin-turbo V8 super-sedan. 0-100km/h in 3.3s. M xDrive, carbon ceramic brakes, Merino leather. Immaculate and fully loaded.',
      specs:{ 'Year':'2022', 'Mileage':'24,900 km', 'Engine':'4.4L V8 TwinTurbo', 'Power':'617 hp', 'Transmission':'8-Speed M Steptronic', 'Fuel':'Petrol' } },

    { id:3, name:'Toyota Land Cruiser VXR (2023)', category:'suv', brand:'Toyota', price:165000000, oldPrice:178000000,
      image:IMG.landCruiser, gallery:[IMG.landCruiser, IMG.interior, IMG.wheel], condition:'Brand New', rating:5.0, reviews:48, badge:'new',
      desc:'The legend, redefined. 3.5L twin-turbo V6, multi-terrain select, cooled seats, 12.3-inch display. Built for Nigerian roads. Brand new with full warranty.',
      specs:{ 'Year':'2023', 'Mileage':'0 km', 'Engine':'3.5L V6 TwinTurbo', 'Transmission':'10-Speed Auto', 'Drivetrain':'4WD', 'Seats':'7' } },

    { id:4, name:'Range Rover Autobiography (2022)', category:'luxury', brand:'Land Rover', price:198000000, oldPrice:0,
      image:IMG.rangeRover, gallery:[IMG.rangeRover, IMG.interior2, IMG.wheel], condition:'Foreign Used', rating:4.8, reviews:19, badge:'certified',
      desc:'Supreme refinement and off-road capability. Executive Class rear seating, Meridian Signature audio, 24-way massaging seats. Pristine condition.',
      specs:{ 'Year':'2022', 'Mileage':'29,100 km', 'Engine':'3.0L I6 MHEV', 'Transmission':'8-Speed Auto', 'Drivetrain':'AWD', 'Fuel':'Petrol' } },

    { id:5, name:'Lexus LX 600 (2023)', category:'suv', brand:'Lexus', price:172000000, oldPrice:189000000,
      image:IMG.lexus, gallery:[IMG.lexus, IMG.interior, IMG.wheel], condition:'Foreign Used', rating:4.9, reviews:22, badge:'sale',
      desc:'Flagship Lexus SUV. Mark Levinson 25-speaker audio, semi-aniline leather, rear entertainment. Bulletproof reliability meets first-class luxury.',
      specs:{ 'Year':'2023', 'Mileage':'12,700 km', 'Engine':'3.5L V6 TwinTurbo', 'Transmission':'10-Speed Auto', 'Drivetrain':'4WD', 'Seats':'7' } },

    { id:6, name:'Porsche 911 Carrera S (2021)', category:'sports', brand:'Porsche', price:156000000, oldPrice:0,
      image:IMG.porsche, gallery:[IMG.porsche, IMG.interior2, IMG.wheel], condition:'Foreign Used', rating:5.0, reviews:15, badge:'certified',
      desc:'Icon of performance. 443hp flat-six, PDK gearbox, sport chrono package. A driver\u2019s dream in stunning GT Silver. Garage kept, low mileage.',
      specs:{ 'Year':'2021', 'Mileage':'16,200 km', 'Engine':'3.0L Flat-6 TwinTurbo', 'Power':'443 hp', 'Transmission':'8-Speed PDK', 'Fuel':'Petrol' } },

    { id:7, name:'Toyota Camry XSE (2023)', category:'sedan', brand:'Toyota', price:42000000, oldPrice:48000000,
      image:IMG.camry, gallery:[IMG.camry, IMG.interior, IMG.wheel], condition:'Foreign Used', rating:4.8, reviews:96, badge:'sale',
      desc:'Sporty, efficient, and dependable. Panoramic roof, JBL audio, wireless CarPlay. The smart executive\u2019s daily driver. Clean title, well maintained.',
      specs:{ 'Year':'2023', 'Mileage':'21,500 km', 'Engine':'2.5L 4-Cylinder', 'Transmission':'8-Speed Auto', 'Drivetrain':'FWD', 'Fuel':'Petrol' } },

    { id:8, name:'Honda Accord Touring (2022)', category:'sedan', brand:'Honda', price:38500000, oldPrice:0,
      image:IMG.accord, gallery:[IMG.accord, IMG.interior2, IMG.wheel], condition:'Foreign Used', rating:4.7, reviews:74, badge:'certified',
      desc:'Refined and roomy. Head-up display, ventilated seats, Honda Sensing suite. Excellent fuel economy. A complete package for the modern family.',
      specs:{ 'Year':'2022', 'Mileage':'26,800 km', 'Engine':'1.5L Turbo', 'Transmission':'CVT', 'Drivetrain':'FWD', 'Fuel':'Petrol' } },

    { id:9, name:'Ford F-150 Raptor (2022)', category:'truck', brand:'Ford', price:128000000, oldPrice:0,
      image:IMG.fordTruck, gallery:[IMG.fordTruck, IMG.interior, IMG.wheel], condition:'Foreign Used', rating:4.9, reviews:18, badge:'certified',
      desc:'The ultimate performance truck. 450hp EcoBoost V6, FOX live valve suspension, terrain management. Conquers anything. Loaded with every option.',
      specs:{ 'Year':'2022', 'Mileage':'22,300 km', 'Engine':'3.5L V6 EcoBoost', 'Power':'450 hp', 'Transmission':'10-Speed Auto', 'Drivetrain':'4WD' } },

    { id:10, name:'Toyota Hilux Adventure (2023)', category:'truck', brand:'Toyota', price:64000000, oldPrice:71000000,
      image:IMG.hilux, gallery:[IMG.hilux, IMG.interior2, IMG.wheel], condition:'Brand New', rating:4.8, reviews:62, badge:'sale',
      desc:'Indestructible workhorse. 2.8L turbo diesel, locking rear diff, 3.5-tonne towing. The pickup that built Nigeria. Brand new with manufacturer warranty.',
      specs:{ 'Year':'2023', 'Mileage':'0 km', 'Engine':'2.8L Turbo Diesel', 'Transmission':'6-Speed Auto', 'Drivetrain':'4WD', 'Fuel':'Diesel' } },

    { id:11, name:'Mercedes-AMG G 63 (2022)', category:'luxury', brand:'Mercedes-Benz', price:295000000, oldPrice:0,
      image:IMG.gwagon, gallery:[IMG.gwagon, IMG.interior, IMG.wheel], condition:'Foreign Used', rating:5.0, reviews:27, badge:'certified',
      desc:'The undisputed status symbol. 577hp hand-built AMG V8, twin 12.3-inch displays, Nappa leather. Commanding presence in matte black. Simply iconic.',
      specs:{ 'Year':'2022', 'Mileage':'14,600 km', 'Engine':'4.0L V8 BiTurbo', 'Power':'577 hp', 'Transmission':'9-Speed Auto', 'Drivetrain':'4WD' } },

    { id:12, name:'Audi Q7 55 TFSI (2022)', category:'suv', brand:'Audi', price:96000000, oldPrice:108000000,
      image:IMG.audiQ7, gallery:[IMG.audiQ7, IMG.interior2, IMG.wheel], condition:'Foreign Used', rating:4.7, reviews:33, badge:'sale',
      desc:'Sophisticated 7-seat SUV. Virtual cockpit, Bang & Olufsen 3D audio, quattro AWD, air suspension. Effortless luxury for the whole family.',
      specs:{ 'Year':'2022', 'Mileage':'27,400 km', 'Engine':'3.0L V6 TFSI', 'Transmission':'8-Speed Tiptronic', 'Drivetrain':'quattro AWD', 'Seats':'7' } },

    { id:13, name:'Tesla Model S Plaid (2022)', category:'luxury', brand:'Tesla', price:178000000, oldPrice:0,
      image:IMG.tesla, gallery:[IMG.tesla, IMG.interior, IMG.wheel], condition:'Foreign Used', rating:4.9, reviews:21, badge:'certified',
      desc:'1,020hp electric hypercar disguised as a sedan. 0-100km/h in 2.1s, 600km range, full self-driving capability. The future, delivered today.',
      specs:{ 'Year':'2022', 'Mileage':'19,800 km', 'Power':'1,020 hp', 'Range':'600 km', 'Drivetrain':'Tri-Motor AWD', 'Fuel':'Electric' } },

    { id:14, name:'Lamborghini Huracan EVO (2021)', category:'sports', brand:'Lamborghini', price:420000000, oldPrice:0,
      image:IMG.lambo, gallery:[IMG.lambo, IMG.interior2, IMG.wheel], condition:'Foreign Used', rating:5.0, reviews:9, badge:'certified',
      desc:'Naturally-aspirated 5.2L V10, 631hp, screaming to 8,500rpm. Carbon fibre everything. An exotic masterpiece in Arancio Borealis. Collector grade.',
      specs:{ 'Year':'2021', 'Mileage':'7,300 km', 'Engine':'5.2L V10', 'Power':'631 hp', 'Transmission':'7-Speed DCT', 'Drivetrain':'AWD' } },

    { id:15, name:'Bentley Continental GT (2021)', category:'luxury', brand:'Bentley', price:312000000, oldPrice:340000000,
      image:IMG.bentley, gallery:[IMG.bentley, IMG.interior, IMG.wheel], condition:'Foreign Used', rating:5.0, reviews:11, badge:'sale',
      desc:'Handcrafted British grand tourer. 6.0L W12, rotating dashboard display, diamond-quilted leather. Where artistry meets 333km/h. Exquisite.',
      specs:{ 'Year':'2021', 'Mileage':'13,100 km', 'Engine':'6.0L W12 TwinTurbo', 'Power':'626 hp', 'Transmission':'8-Speed DCT', 'Drivetrain':'AWD' } },

    { id:16, name:'Toyota Corolla LE (2023)', category:'sedan', brand:'Toyota', price:33500000, oldPrice:37000000,
      image:IMG.corolla, gallery:[IMG.corolla, IMG.interior2, IMG.wheel], condition:'Foreign Used', rating:4.6, reviews:118, badge:'sale',
      desc:'The world\u2019s best-selling car for good reason. Frugal, reliable, comfortable. Toyota Safety Sense, Apple CarPlay. The smart first car or daily commuter.',
      specs:{ 'Year':'2023', 'Mileage':'17,900 km', 'Engine':'2.0L 4-Cylinder', 'Transmission':'CVT', 'Drivetrain':'FWD', 'Fuel':'Petrol' } },

    { id:17, name:'Jeep Wrangler Rubicon (2022)', category:'suv', brand:'Jeep', price:88000000, oldPrice:0,
      image:IMG.jeep, gallery:[IMG.jeep, IMG.interior, IMG.wheel], condition:'Foreign Used', rating:4.7, reviews:29, badge:'certified',
      desc:'Born for adventure. Removable roof and doors, Rock-Trac 4WD, electronic sway-bar disconnect. Trail-rated and unstoppable. A true off-road icon.',
      specs:{ 'Year':'2022', 'Mileage':'23,600 km', 'Engine':'3.6L V6', 'Transmission':'8-Speed Auto', 'Drivetrain':'4WD', 'Fuel':'Petrol' } },

    { id:18, name:'Chevrolet Corvette Stingray (2022)', category:'sports', brand:'Chevrolet', price:134000000, oldPrice:0,
      image:IMG.corvette, gallery:[IMG.corvette, IMG.interior2, IMG.wheel], condition:'Foreign Used', rating:4.9, reviews:14, badge:'certified',
      desc:'Mid-engine American supercar. 6.2L V8, 495hp, 0-100km/h in 2.9s. Z51 performance package. Stunning Torch Red over black. Head-turning value.',
      specs:{ 'Year':'2022', 'Mileage':'11,200 km', 'Engine':'6.2L V8', 'Power':'495 hp', 'Transmission':'8-Speed DCT', 'Drivetrain':'RWD' } },

    { id:19, name:'Nissan Patrol Titanium (2022)', category:'suv', brand:'Nissan', price:118000000, oldPrice:129000000,
      image:IMG.patrol, gallery:[IMG.patrol, IMG.interior, IMG.wheel], condition:'Foreign Used', rating:4.8, reviews:26, badge:'sale',
      desc:'Imposing full-size luxury SUV. 5.6L V8, hydraulic body motion control, BOSE audio, 8 seats. Desert king with palatial comfort. Beautifully kept.',
      specs:{ 'Year':'2022', 'Mileage':'25,700 km', 'Engine':'5.6L V8', 'Transmission':'7-Speed Auto', 'Drivetrain':'4WD', 'Seats':'8' } },

    { id:20, name:'BMW X7 xDrive40i (2023)', category:'luxury', brand:'BMW', price:158000000, oldPrice:0,
      image:IMG.bmwX7, gallery:[IMG.bmwX7, IMG.interior2, IMG.wheel], condition:'Foreign Used', rating:4.8, reviews:17, badge:'certified',
      desc:'BMW\u2019s flagship SUV. Three rows of luxury, Sky Lounge LED roof, Harman Kardon audio, executive lounge seating. Commanding yet refined.',
      specs:{ 'Year':'2023', 'Mileage':'15,400 km', 'Engine':'3.0L I6 TwinTurbo', 'Transmission':'8-Speed Auto', 'Drivetrain':'xDrive AWD', 'Seats':'7' } },

    { id:21, name:'Rolls-Royce Ghost (2021)', category:'luxury', brand:'Rolls-Royce', price:560000000, oldPrice:0,
      image:IMG.rolls, gallery:[IMG.rolls, IMG.interior, IMG.wheel], condition:'Foreign Used', rating:5.0, reviews:6, badge:'certified',
      desc:'The definition of automotive royalty. 6.75L V12, Starlight headliner, Planar suspension, lambswool floor mats. Whisper-quiet, hand-built perfection.',
      specs:{ 'Year':'2021', 'Mileage':'8,900 km', 'Engine':'6.75L V12 TwinTurbo', 'Power':'563 hp', 'Transmission':'8-Speed Auto', 'Drivetrain':'AWD' } },

    { id:22, name:'Ford Mustang GT Premium (2022)', category:'sports', brand:'Ford', price:72000000, oldPrice:79000000,
      image:IMG.mustang, gallery:[IMG.mustang, IMG.interior2, IMG.wheel], condition:'Foreign Used', rating:4.7, reviews:41, badge:'sale',
      desc:'American muscle legend. 5.0L Coyote V8, 460hp, active exhaust, Recaro seats. That unmistakable rumble. Race Red and ready to thrill.',
      specs:{ 'Year':'2022', 'Mileage':'20,100 km', 'Engine':'5.0L V8', 'Power':'460 hp', 'Transmission':'10-Speed Auto', 'Drivetrain':'RWD' } }
];
