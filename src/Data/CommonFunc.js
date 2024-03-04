exports.validateEmployeeData = (data, isEdit) => {

  // Check if all required fields are present
  const requiredFields = ['username', 'password', 'name', 'contact', 'email', 'gender', 'dob', 'nic', 'designation', 'salary', 'isActive'];
  for (const field of requiredFields) {
    if (!data[field] && field !== 'password' && !isEdit && field !== 'isActive') {
      return { isValid: false, message: `${field} is required` };
    }
  }

  // Check gender
  if (!['M', 'F', 'O'].includes(data.gender)) {
    return { isValid: false, message: 'Gender should be either "M", "F", or "O"' };
  }

  // Check manager_id
  if (data.manager_id !== null && !Number.isInteger(data.manager_id)) {
    return { isValid: false, message: 'Manager ID should be an integer or null' };
  }

  // Convert salary to numeric value with 2 decimal places
  const salary = parseFloat(data.salary);
  if (isNaN(salary)) {
    return { isValid: false, message: 'Salary should be a numeric value' };
  }
  data.salary = salary.toFixed(2);

  // Check if isActive is a boolean value
  if (typeof data.isActive !== 'boolean') {
    return { isValid: false, message: 'isActive should be a boolean value' };
  }

  return { isValid: true };

}