import React,{useState,useEffect} from "react";
import { Route , Switch } from "react-router-dom";
import Hoc from "./hoc/hoc"
import Movie from './thriller/Movie'
import Blog from './blog/Blog'
import BlogDetail from './blog/ArticleDetail'
import BlogCreate from './blog/ArticleCreate'
import Login from "./containers/Login";
import Logout from "./containers/Logout";
import Signup from "./containers/Signup";
import Music from './music/Music'

const BaseRouter = () => (
    <Switch>
        <Route exact path="/movie" component={Movie}/>
        <Route exact path="/music" component={Music}/>
        <Route exact path="/login/" component={Login}/>
        <Route exact path="/logout/" component={Logout}/>
        <Route exact path="/signup/" component={Signup}/>
        <Route exact path="/blog/" component={Blog}/>
        <Route exact path="/blog_create/" component={BlogCreate}/>
        <Route exact path="/blog/:id/" component={BlogDetail}/>
    </Switch>
);

export default BaseRouter;
