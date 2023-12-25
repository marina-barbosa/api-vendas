import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

interface InterfaceRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({
    id,
    name,
    email
  }: InterfaceRequest): Promise<Customer> {

    const customersRepository = CustomersRepository;

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists && email !== customerExists.email) {
      throw new AppError('There is already one customer with this email');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;

  }
}

export default UpdateCustomerService;