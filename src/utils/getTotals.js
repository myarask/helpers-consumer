const getTotals = (services, baseFee) => {
  let serviceFees = 0;

  services.forEach((service) => {
    serviceFees += service.fee;
  });

  const preTax = serviceFees + baseFee;
  const taxes = preTax * 0.13;
  const total = preTax * 1.13;

  return {
    serviceFees: `$${(serviceFees / 100).toFixed(2)}`,
    taxes: `$${(taxes / 100).toFixed(2)}`,
    total: `$${(total / 100).toFixed(2)}`,
  };
};

export default getTotals;
