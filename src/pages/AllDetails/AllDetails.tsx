import { FC, useEffect, useState } from "react";
import { Grid, Col, Select, TextInput } from "@mantine/core";
import DataBox from "../../components/DataBox";
import DragonBox from "../../components/DragonBox";
import { fetchData } from "../../api/FetchData";
import { useLocation } from "react-router-dom";

interface Launches {
  name: string;
  date: string;
  id: any;
  img: any;
  details: any;
  success: any;
  youtubeLink: any;
  wikipedia: any;
  article: any;
  presskit: any;
}

interface Dragons {
  name: string;
  id: any;
  type: any;
  img: any;
  active: boolean;
  details: any;
  wikipedia: any;
}

const Alldetails: FC = () => {
  const { state } = useLocation();
  const { category } = state;

  const [data, setData] = useState<(Launches | Dragons)[]>([]);
  const [filteredData, setFilteredData] = useState<(Launches | Dragons)[]>([]);
  const [selectedLaunch, setSelectedLaunches] = useState(
    category === "dragons" ? "dragons" : "launches"
  );
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchData({ params: selectedLaunch });
        setData(result);
      } catch (error: any) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchLaunches();
  }, [selectedLaunch]);

  useEffect(() => {
    let updatedData = [...data];

    if (selectedLaunch === "launches") {
      updatedData.sort((a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    } else if (selectedLaunch === "dragons") {
      if (statusFilter === "active") {
        updatedData = updatedData.filter((d: any) => d.active === true);
      } else if (statusFilter === "inactive") {
        updatedData = updatedData.filter((d: any) => d.active === false);
      }
    }

    if (searchTerm.trim()) {
      updatedData = updatedData.filter((item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(updatedData);
  }, [sortOrder, selectedLaunch, statusFilter, searchTerm, data]);

  const handleSortChange = (val: string | null) => {
    if (val) setSortOrder(val);
  };

  const handleFilterChange = (val: string | null) => {
    if (val) {
      setSelectedLaunches(val);
      setStatusFilter("all");
      setSearchTerm(""); // reset search
    }
  };

  const handleStatusFilterChange = (val: string | null) => {
    if (val) setStatusFilter(val);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>
        {selectedLaunch.charAt(0).toUpperCase() + selectedLaunch.slice(1)}
      </h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "100vw",  
        }}
      >
        <Select
          value={selectedLaunch}
          onChange={handleFilterChange}
          data={[
            { value: "launches", label: "Launches" },
            { value: "dragons", label: "Dragons" },
          ]}
          placeholder="Select Category"
          style={{ width: "200px", maxWidth: "100vw" }}
        />

        {selectedLaunch === "launches" ? (
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            data={[
              { value: "asc", label: "Ascending" },
              { value: "desc", label: "Descending" },
            ]}
            placeholder="Sort by Date"
            style={{ width: "200px", maxWidth: "100vw" }}
          />
        ) : (
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            data={[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            placeholder="Filter by Status"
            style={{ width: "200px", maxWidth: "100vw" }}
          />
        )}

        <TextInput
          value={searchTerm}
          onChange={(event) => handleSearchChange(event.currentTarget.value)}
          placeholder="Search by Name"
          style={{ width: "200px", maxWidth: "100vw" }}
        />
      </div>

      <Grid gutter="md" style={{ width: "80%", maxWidth: "100vw" }}>
        {filteredData.map((element: any, index: number) => (
          <Col key={index} xs={6} sm={6} md={4} lg={3}>
            {selectedLaunch === "launches" ? (
              <DataBox
                name={element.name}
                date={element.date}
                id={element.id}
                img={element.img}
                details={element.details}
                success={element.success}
                youtubeLink={element.youtubeLink}
                wikipedia={element.wikipedia}
                article={element.article}
                presskit={element.presskit}
                selectedLaunch={selectedLaunch}
              />
            ) : (
              <DragonBox
                name={element.name}
                id={element.id}
                type={element.type}
                img={element.img || element.flickr_images?.[0]}
                active={element.active}
                details={element.details || element.description}
                wikipedia={element.wikipedia}
                selectedLaunch={selectedLaunch}
              />
            )}
          </Col>
        ))}
      </Grid>
    </div>
  );
};

export default Alldetails;
