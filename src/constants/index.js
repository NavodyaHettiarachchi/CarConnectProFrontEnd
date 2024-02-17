export const roles = [
  {
    page: 'Ongoing Services',
    description: `'All the privileges regarding the ongoing services page, 
      which include page view, card, dashboard, on going services tab, individual vehicle detail
      view and edit functions will be assigned from this role.
    '`,
    role: {
      view: 'os:v',
      edit: 'os:ad',
    }
  },
  {
    page: 'Employees',
    description: `'All the privileges regarding the employees page, 
      which include page view, employee table , reduced employee (user and subordinates), add employee,
      employee details,  
      view and edit functions will be assigned from this role.
    '`,
    role: {
      view: 'ep:v',
      edit: 'ep:ad',
    }
  },
  {
    page: 'Inventory',
    description: `'All the privileges regarding the inventory page, 
      which include page view, inventory list view, inventory detail, add inventory, assign parts
      view and edit functions will be assigned from this role.
    '`,
    role: {
      view: 'ip:v',
      edit: 'ip:ad',
    }
  },

  {
    page: 'Settings',
    description: `All the privileges  regarding the center admin page,
    which includes, roles, roles assigning, center information,
    view and edit functions will be assinged from this role
    `,
    role: {
      view: 'sp:v',
      edit: 'sp:ad',
    }
  }
];


export const preDefinedRoles = [
  {
    name: 'Super Admin',
    description: 'User who can view edit every single part of the website',
    role: 'sa:ad',
  }
];