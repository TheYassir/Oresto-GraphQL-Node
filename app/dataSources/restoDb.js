const { BatchedSQLDataSource } = require('@nic-jennings/sql-datasource');
const City = require('../datamappers/city');
const Restaurant = require('../datamappers/restaurant');
const RestaurantHasCookingStyle = require('../datamappers/restaurantHasCookingStyle');
const Manager = require('../datamappers/manager');
const CookingStyle = require('../datamappers/cookingStyle');

class RestoDB extends BatchedSQLDataSource {
  constructor(options) {
    super(options);
    // J'ai accès au query builder knex à travers this.db ou this.knex
    this.instanciateDataMappers();
  }

  // On conserve la séparation des préoccupations en déléguant la responsabilité de la récupération
  // de données aux datamappers

  // La classe de datasource est responsable de l'instanciation des datamappers, c'est donc devenu
  // également une factory

  instanciateDataMappers() {
    this.city = new City(this.db);
    this.restaurant = new Restaurant(this.db);
    this.restaurantHasCookingStyle = new RestaurantHasCookingStyle(this.db);
    this.manager = new Manager(this.db);
    this.cookingStyle = new CookingStyle(this.db);
  }
}

module.exports = RestoDB;
