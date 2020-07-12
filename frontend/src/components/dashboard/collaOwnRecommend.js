import React, { useState } from "react";
import M from "materialize-css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import DreamerOwnProject from "./dreamerOwnProject";

class CollaOwnRecommend extends React.Component {
    constructor() {
        super();
    }

    state = {
        myProjects: [],
    };

    async componentDidMount() {
        // Auto initialize all the materailize css!
        M.AutoInit();
        const a = localStorage.getItem("token");

        const config = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "AUTH-KEY": a,
            },
        };

        const res = await axios.get("/collaborator/recommendation", config);
        console.log("colla project",res.data);
        this.setState({ myProjects: res.data.projects });
    }

    render() {
        const category_list = [
            "All other",
            "A web based application",
            "A desktop application",
            "A mobile application",

            "A library for other project to reference",

            "A modification to existing platform",
            "A research oriented project",
        ];
        return (
            <div>
                <header>
                    <div className="navbar-fixed" style={{ position: "fixed" }}>
                        <Link data-target="nav-mobile" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </Link>
                    </div>
                    <div>
                        <ul
                            id="nav-mobile"
                            className="sidenav sidenav-fixed"
                            style={{ position: "fixed" }}
                        >
                            <li className="bold">
                                <Link className="waves-effect waves-teal">
                                    My Projects
                                </Link>
                            </li>
                            <li className="bold">
                                <Link className="waves-effect waves-teal" to="./crecommend">
                                    Recommend Projects
                                </Link>
                            </li>

                            <li className="bold">
                                <Link className="waves-effect waves-teal" to="./drecommend">
                                    Followed Projects
                                </Link>
                            </li>

                            <li className="bold">
                                <Link className="waves-effect waves-teal" to="./drecommend">
                                    My Info
                                </Link>
                            </li>

                            <div className="logo">
                                <h3>Logo</h3>
                            </div>
                        </ul>
                    </div>
                </header>

                <main>
                    <div className="container">
                        <div className="row">
                            <div className="col s12 l12 dashboard">
                                <div className="card grey lighten-3">
                                    <div className="card-content posts">
                                        <nav className="pink darken-1">
                                            <div className="nav-wrapper">
                                                <h4 className="left event-title">EVENTS</h4>
                                                <form className="search-field right">
                                                    <div className="input-field">
                                                        <input id="search" type="search" required />
                                                        <label
                                                            className="label-icon search-icon"
                                                            for="search"
                                                        >
                                                            <i className="material-icons">search</i>
                                                        </label>
                                                        <i className="material-icons close-icon">close</i>
                                                    </div>
                                                </form>
                                            </div>
                                        </nav>
                                        {this.state.myProjects.length > 0 ? (
                                            this.state.myProjects.map((each, index) => {
                                                return (
                                                    <DreamerOwnProject
                                                        key={index}
                                                        title={each.title}
                                                        description={each.description}
                                                        category={category_list[each.category]}
                                                        id={each.id}
                                                        create_time={each.create_time}
                                                        last_update={each.last_update}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <p>Apply for your first project</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default CollaOwnRecommend;