import React, { Component } from "react";
import { Container } from "react-bootstrap";
import TabularView from "./AdminPageTable/TabularView";

import { apiEndpoint, PAGELIMIT, DATALIMIT } from "../config";
import "./styles.css";
import Paginate from "./PageFunctions";
export default class Main extends Component {
  constructor() {
    super();
    this.totalData = [];
    this.debounceTimeout = "";
    this.state = {
      loading: false,
      data: [],
    };
  }

  search = (text) => {
    if (text === "") {
      this.setState({ data: [...this.totalData] });
    } else {
      this.setState((state) => {
        return {
          data: this.state.data.filter(
            (el) =>
              el.name.toLowerCase().includes(text.toLowerCase()) ||
              el.email.toLowerCase().includes(text.toLowerCase()) ||
              el.role.toLowerCase().includes(text.toLowerCase())
          ),
        };
      });
    }
  };
  
  debounceSearch = (event) => {
    let txt = event.target.value;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(
      function () {
        this.search(txt);
      }.bind(this),
      200
    );
  };

  deleteUserdata = (id) => {
    this.totalData = this.totalData.filter((el) => el.id !== id);
    this.setState({ data: [...this.state.data.filter((el) => el.id !== id)] });
  };

      //deleting id array for multi delete
  multiuserDelete = (id) => {

    this.setState({
      data: [...this.state.data.filter((el) => id.indexOf(el.id) < 0)],
    });
    this.totalData = this.totalData.filter((el) => id.indexOf(el.id) < 0);
  };
  APIcall = async () => {
    let res = [];
    try {
      res = await (await fetch(apiEndpoint.URL)).json();
    } catch (err) {
      console.log(err);
    } finally {
      return res;
    }
  };
  async componentDidMount() {
    let res;
    try {
      res = await this.APIcall();
    } catch (err) {
      alert("coulnt fetch users");
      console.log(err);
    }

    if (res && res.length > 0) {
      this.setState({ data: [...res] });
      this.totalData = [...res];
    }
  }
  render() {
    return (
      <Container>
        <h2 className="mb-5 mt-5">Greek Trust Admin Page using React app</h2>
        <div className="search-bar-container">
          <input
            id="search-bar"
            type="text"
            onChange={(e) => {
              this.debounceSearch(e);
            }}
            placeholder="search by name, email or role"
          />
        </div>

        {/* </span> */}
        {this.state.data.length > 0 ? (
          <Paginate
            data={this.state.data}
            pageLimit={PAGELIMIT}
            dataLimit={DATALIMIT}
            onDelete={this.deleteUserdata}
            onmultiuserDelete={this.multiuserDelete}
            RenderComponent={TabularView}
          />
        ) : (
          <div>No data to display</div>
        )}
      </Container>
    );
  }
}
