import React from 'react';

export const roles = [
  {
    name: 'Dashboard',
    description: 'View or edit dashboard of a center',
    roles: {
      view: 'sp:ad',
      edit: 'sp:ad',
    }
  },
  {
    name: 'On Going Services',
    description: 'View or edit on going services of a center',
    roles: {
      edit: 'os:ad',
      view: 'os:v',
    }
  },
  {
    name: 'Employees',
    description: 'View or edit employees of a center',
    roles: {
      edit: 'ep:ad',
      view: 'ep:v',
    }
  },
  {
    name: 'Inventory',
    description: 'View or edit inventory of a center',
    roles: {
      edit: 'ip:ad',
      view: 'ip:v',
    }
  },
  {
    name: 'Settings',
    description: 'View or edit settings of a center',
    roles: {
      edit: 'sp:ad',
      view: 'sp:v',
    }
  },
  {
    name: 'Clientele',
    description: 'View or edit client data of a center',
    roles: {
      edit: 'cp:ad',
      view: 'cp:v',
    }
  },
  {
    name: 'Profile',
    description: 'View or edit Profile of a center/ owner or employee',
    roles: {
      edit: 'pp:ad'
    }
  },
  {
    name: 'My Vehicles',
    description: 'View or edit vehicles of a owner',
    roles: {
      edit: 'mv:ad',
      view: 'mv:v',
    }
  }, 
  {
    name: 'Center System Admin',
    description: 'View or edit anything of a center',
    roles: {
      edit: 's:ad'
    }
  }
]