import React, { Component } from "react";
import "./PageFunctions.css";
import { Button } from "react-bootstrap";

export default class Paginate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      pages: Math.max(
        Math.round(this.props.data.length / this.props.dataLimit),
        1
      ),
      currentPage: 1,
    };
  }
                        
  navigateToFirst = () => {
    this.setState({ currentPage: 1, selected: [] });
  };

  navigateToLast = () => {
    this.setState({ currentPage: this.state.pages, selected: [] });
  };
  naviagateToNext = () => {
    if (this.state.currentPage < this.state.pages)
      this.setState({ currentPage: this.state.currentPage + 1, selected: [] });
  };

  naviagateToPrevious = () => {
    if (this.state.currentPage > 0)
      this.setState({ currentPage: this.state.currentPage - 1, selected: [] });
  };

  movefrompage = (event) => {
    const pageNumber = Number(event.target.textContent);
    this.setState({ currentPage: pageNumber, selected: [] });
  };
  getPageData = () => {
    const startIndex =
      this.state.currentPage * this.props.dataLimit - this.props.dataLimit;
    const endIndex = startIndex + this.props.dataLimit;
    return this.props.data.slice(startIndex, endIndex);
  };

  getPageGroup = () => {
    let start =
      Math.floor((this.state.currentPage - 1) / this.props.dataLimit) *
      this.props.dataLimit;

    return new Array(Math.min(this.state.pages, this.props.pageLimit))
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  toggleAllVisibledata = () => {
    if (this.state.selected.length === this.getPageData().length) {
      //toggle data
      this.setState({ selected: [] });
    } else {
      // select all data
      this.setState({
        selected: [...this.getPageData().map((el) => el.id)],
      });
    }
  };
  toggleRowdata = (id) => {
    let newSelected = [...this.state.selected];
    let idx = this.state.selected.indexOf(id);

    if (idx >= 0) {
      //remove row
      newSelected = this.state.selected.filter((el) => el !== id);
    } else {
      //select row
      newSelected = [id, ...newSelected];
    }
    this.setState({ selected: [...newSelected] });
  };
  handleDelete = (id) => {
    if (!id.length) {
      
      //call the delete method to remove id
      this.setState({
        selected: [...this.state.selected.filter((el) => el !== id)],
      });
      //parent method is called
      this.props.onDelete(id);
    } else {
      //id array
      this.setState({
        selected: [...this.state.selected.filter((el) => id.indexOf(el) < 0)],
      });
      //parent method is called
      this.props.onmultiuserDelete(id);
    }
  };
  calculatePages = (newProps) => {
    return Math.max(1, Math.round(newProps.data.length / newProps.dataLimit));
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({
      pages: this.calculatePages(newProps),
      currentPage: 1,
    });
  }

  render() {
    return (
      <>
        <this.props.RenderComponent
          columns={Object.keys(this.props.data[0]).slice(1)}
          data={this.getPageData()}
          selected={this.state.selected}
          onAllSelect={this.toggleAllVisibledata}
          onSelect={this.toggleRowdata}
          delete={this.handleDelete}
        />

        {this.state.selected.length > 0 ? (
          <Button
            onClick={() => {
              this.handleDelete(this.state.selected);            }}
            variant="danger"
          >
            Delete
          </Button>
        ) : null}

        {/* Pagination  it consists of next and previous buttons
         along with page numbers, in our case, 5 page numbers at a time
            */}

         {/* Here we have used bootstrap classes for the next previos arrow icons */}
        <div className="pagination">
          {/* First page */}
          <button
            onClick={this.navigateToFirst}
            className={`prev ${this.state.currentPage === 1 ? "disabled" : ""}`}
          >
            <i className="fas fa-angle-double-left"></i>
            
          </button>
          {/* previous page */}
          <button
            onClick={this.naviagateToPrevious}
            className={`prev ${this.state.currentPage === 1 ? "disabled" : ""}`}
          >
           <i className="fas fa-angle-left"></i>
       
          </button>

          {/*  page numbers  */}
          {this.getPageGroup().map((item, index) => (
            <button
              key={index}
              onClick={this.movefrompage}
              className={`paginationItem ${
                this.state.currentPage === item ? "active" : null
              }`}
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next page */}
          <button
            onClick={this.naviagateToNext}
            className={`next ${
              this.state.currentPage === this.state.pages ? "disabled" : ""
            }`}
          >
          <i className="fas fa-angle-right"></i>

          
          </button>
          {/* last page  */}
          <button
            onClick={this.navigateToLast}
            className={`next ${
              this.state.currentPage === this.state.pages ? "disabled" : ""
            }`}
          >
            <i className="fas fa-angle-double-right"></i>
          </button>
        </div>
      </>
    );
  }
}
