/**
 * 🍱 Mumbai ka Dabbawala Service - ES6 Classes
 *
 * Mumbai ke famous dabbawala system ko ab modern ES6 class mein likho!
 * Har din hazaaron dabbas deliver hote hain aur ek bhi galat nahi jaata.
 * Tumhe DabbaService class banana hai jo customers manage kare, delivery
 * batches banaye, aur daily reports generate kare.
 *
 * Class: DabbaService
 *
 *   constructor(serviceName, area)
 *     - this.serviceName = serviceName
 *     - this.area = area
 *     - this.customers = [] (internal array)
 *     - this._nextId = 1 (auto-increment counter)
 *
 *   addCustomer(name, address, mealPreference)
 *     - mealPreference must be one of: "veg", "nonveg", "jain"
 *     - Agar invalid preference, return null
 *     - Agar name already exists (duplicate), return null
 *     - Creates customer: { id: auto-increment, name, address, mealPreference,
 *       active: true, delivered: false }
 *     - Pushes to this.customers
 *     - Returns the customer object
 *
 *   removeCustomer(name)
 *     - Sets customer's active to false (soft delete)
 *     - Returns true if found and deactivated
 *     - Returns false if not found or already inactive
 *
 *   createDeliveryBatch()
 *     - Returns array of delivery objects for all ACTIVE customers
 *     - Each delivery: { customerId: id, name, address, mealPreference,
 *       batchTime: new Date().toISOString() }
 *     - Resets delivered to false for all active customers before creating batch
 *     - Returns empty array if no active customers
 *
 *   markDelivered(customerId)
 *     - Finds active customer by id, sets delivered to true
 *     - Returns true if found and marked
 *     - Returns false if not found or not active
 *
 *   getDailyReport()
 *     - Returns report object for ACTIVE customers only:
 *       {
 *         totalCustomers: number (active only),
 *         delivered: number (active and delivered === true),
 *         pending: number (active and delivered === false),
 *         mealBreakdown: { veg: count, nonveg: count, jain: count }
 *       }
 *     - mealBreakdown counts active customers only
 *
 *   getCustomer(name)
 *     - Returns customer object by name (including inactive)
 *     - Returns null if not found
 *
 * Rules:
 *   - Use ES6 class syntax (not constructor functions)
 *   - Customer ids auto-increment starting from 1
 *   - No duplicate customer names allowed
 *   - removeCustomer is a soft delete (active: false), not actual removal
 *   - getDailyReport only counts active customers
 *   - mealPreference must be exactly "veg", "nonveg", or "jain"
 *
 * @example
 *   const service = new DabbaService("Raju Dabba", "Dadar");
 *   service.addCustomer("Amit", "Andheri West", "veg");
 *   // => { id: 1, name: "Amit", address: "Andheri West", mealPreference: "veg", active: true, delivered: false }
 *   service.addCustomer("Priya", "Bandra East", "jain");
 *   // => { id: 2, ... }
 *   service.createDeliveryBatch();
 *   // => [{ customerId: 1, name: "Amit", ... }, { customerId: 2, name: "Priya", ... }]
 *   service.markDelivered(1);       // => true
 *   service.getDailyReport();
 *   // => { totalCustomers: 2, delivered: 1, pending: 1, mealBreakdown: { veg: 1, nonveg: 0, jain: 1 } }
 */
export class DabbaService {
  constructor(serviceName, area) {
    // Your code here
    this.serviceName = serviceName;
    this.area = area;
    this.customers = [];
    this._nextId = 1;
  }

  addCustomer(name, address, mealPreference) {
    const meal = ["veg", "nonveg", "jain"];
    if (
      !meal.includes(mealPreference) ||
      this.customers.find((item) => item.name === name)
    )
      return null;

    const newCustomer = {
      id: this._nextId,
      name,
      address,
      mealPreference,
      active: true,
      delivered: false,
    };
    this.customers.push(newCustomer);
    this._nextId++;
    return newCustomer;
  }

  removeCustomer(name) {
    const findUser = this.customers.find((customer) => customer.name === name);
    if (!findUser || findUser.active === false) return false;
    findUser.active = false;
    return true;
  }

  createDeliveryBatch() {
    const activeCustomer = this.customers.filter((customer) => customer.active);
    if (activeCustomer.length === 0) return [];
    const batch = activeCustomer.map((customer) => {
      customer.delivered = false;
      return {
        customerId: customer.id,
        name: customer.name,
        address: customer.address,
        mealPreference: customer.mealPreference,
        batchTime: new Date().toISOString(),
      };
    });
    return batch;
  }
  markDelivered(customerId) {
    //  *     - Finds active customer by id, sets delivered to true
    //  *     - Returns true if found and marked
    //  *     - Returns false if not found or not active

    const findActiveCustomer = this.customers.find(
      (customer) => customer.id === customerId,
    );
    if (!findActiveCustomer || findActiveCustomer.active === false)
      return false;
    findActiveCustomer.delivered = true;
    return true;
  }

  getDailyReport() {
    // Your code here
    const findActiveUser = this.customers.filter(
      (customer) => customer.active === true,
    );
    const totalCustomers = findActiveUser.length;

    const delivered = findActiveUser.filter(
      (user) => user.delivered === true,
    ).length;
    const pending = findActiveUser.filter((u) => u.delivered === false).length;
    const mealBreakdown = findActiveUser.reduce(
      (accumulator, current) => {
        if (current.mealPreference === "veg") {
          accumulator.veg++;
        } else if (current.mealPreference === "nonveg") {
          accumulator.nonveg++;
        } else {
          accumulator.jain++;
        }
        return accumulator;
      },
      { veg: 0, nonveg: 0, jain: 0 },
    );
    return {
      totalCustomers,
      delivered,
      pending,
      mealBreakdown,
    };
  }

  getCustomer(name) {
    // Your code here
    //      *     - Returns customer object by name (including inactive)
    //  *     - Returns null if not found
    const findByName = this.customers.find(customer=>customer.name === name);
    if (findByName) {
      return findByName;
    } else {
      return null;
    }
  }
}
