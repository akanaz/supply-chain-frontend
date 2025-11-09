class DataService {
  constructor() {
    this.products = [];
    this.roles = {
      RMS: [],
      MAN: [],
      DIS: [],
      RET: []
    };
    this.productCounter = 0;
    this.initializeDummyData();
  }

  initializeDummyData() {
    this.roles.RMS = [
      { id: 1, name: 'Raw Materials Inc', place: 'Mumbai' },
      { id: 2, name: 'Material Suppliers Ltd', place: 'Bangalore' }
    ];
    this.roles.MAN = [
      { id: 1, name: 'Manufacturing Co', place: 'Delhi' },
      { id: 2, name: 'Product Makers Ltd', place: 'Chennai' }
    ];
    this.roles.DIS = [
      { id: 1, name: 'Quick Dispatch', place: 'Hyderabad' },
      { id: 2, name: 'DistribuCorp', place: 'Pune' }
    ];
    this.roles.RET = [
      { id: 1, name: 'Retail Store 1', place: 'Kolkata' },
      { id: 2, name: 'Retail Outlet 2', place: 'Goa' }
    ];
    this.products = [
      {
        id: 1,
        name: 'Product A',
        description: 'Description of Product A',
        stage: 0,
        RMSid: 1,
        MANid: 1,
        DISid: 1,
        RETid: 1,
        timestamp: new Date()
      },
      {
        id: 2,
        name: 'Product B',
        description: 'Description of Product B',
        stage: 2,
        RMSid: 2,
        MANid: 2,
        DISid: 2,
        RETid: 2,
        timestamp: new Date()
      }
    ];
    this.productCounter = 2;
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  addProduct(name, description, RMSid) {
    this.productCounter++;
    const newProduct = {
      id: this.productCounter,
      name,
      description,
      stage: 0,
      RMSid,
      MANid: null,
      DISid: null,
      RETid: null,
      timestamp: new Date()
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProductStage(productId, stage, entityId, entityType) {
    const product = this.getProductById(productId);
    if (product) {
      product.stage = stage;
      if (entityType === 'MAN') product.MANid = entityId;
      if (entityType === 'DIS') product.DISid = entityId;
      if (entityType === 'RET') product.RETid = entityId;
    }
    return product;
  }

  getAllRoles(roleType) {
    return this.roles[roleType] || [];
  }

  addRole(roleType, name, place) {
    const roles = this.roles[roleType];
    const newId = (roles.length > 0 ? Math.max(...roles.map(r => r.id)) : 0) + 1;
    const newRole = {
      id: newId,
      name,
      place
    };
    roles.push(newRole);
    return newRole;
  }

  getRoleById(roleType, id) {
    return this.roles[roleType]?.find(r => r.id === id);
  }
}

export default new DataService();
