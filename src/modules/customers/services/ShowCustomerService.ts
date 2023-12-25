import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

interface InterfaceRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: InterfaceRequest): Promise<Customer> {
    const customersRepository = CustomersRepository;

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;