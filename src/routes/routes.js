import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "../hoc/mainLayout/mainLayout";
import Home from "../components/home";
import Header from "../components/header/header";
import Contact from "../components/contact";
import PostComponent from "../components/posts";

const Routes = () => (
  <BrowserRouter>
    <Header />
    <MainLayout>
      <Switch>
        <Route path="/post/:id" component={PostComponent} />
        <Route path="/contact" component={Contact} />
        <Route path="/" component={Home} />
      </Switch>
    </MainLayout>
  </BrowserRouter>
);

export default Routes;
