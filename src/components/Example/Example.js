import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiPeanut } from "react-icons/gi";
import axios from "axios";
import { MDBDataTable } from "mdbreact";

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  getColorsJson = () => {
    axios({
      method: "GET",
      url: "/example",
    })
      .then((res) => {
        const { error, result } = res.data;
        if (error) {
          console.log("There was an Express-side error:", error);
        } else {
          this.setState({ data: result.colors });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getColorsJson();
  }

  render() {
    const { data } = this.state;
    console.log("Example component's props:", this.props);
    console.log("Example component state.data", data);
    const tableData = {
      columns: [
        {
          label: "Color",
          field: "color",
          sort: "asc",
          width: 200,
        },
        {
          label: "Category",
          field: "category",
          sort: "asc",
          width: 200,
        },
        {
          label: "Type",
          field: "type",
          sort: "asc",
          width: 200,
        },
      ],
      rows: data,
    };
    return (
      <>
        <h1>Example Page</h1>
        <p>{this.props.takeMyProp}</p>
        <span>{JSON.stringify(data, null, 4)}</span>
        {/* <MDBDataTable responsiveMd striped bordered small data={tableData} /> */}
      </>
    );
  }
}
