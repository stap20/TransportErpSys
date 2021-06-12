import "shared/config";
import Reactor from "reactor/reactor";
import "shared/shared-provider";

//login page
import "modules/users/components/login/en";
import "modules/users/components/login/ar";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap-social/bootstrap-social.css";

//grab all service providers from all modules
import HomeServiceProvider from "modules/home/service-provider";
import UserServiceProvider from "modules/users/service-provider";
import CategoriesServiceProvider from "modules/categories/service-provider";

const reactor = new Reactor();

reactor.registerServiceProviders([
  HomeServiceProvider,
  UserServiceProvider,
  CategoriesServiceProvider,
]);

//start the application
reactor.react();
