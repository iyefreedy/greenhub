import React, { useState } from "react";
import {
	MDBBtn,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBIcon,
	MDBInput,
	MDBBtnGroup,
} from "mdb-react-ui-kit";
import logo from "../assets/img/logo.svg";
import signup_img from "../assets/img/signup.png";
import { useNavigate } from "react-router-dom";

function SellerReg() {
	const Navigate = useNavigate();
	const [storeName, setStoreName] = useState<string>("");
	const [storeAddress, setStoreAddress] = useState<string>("");
	const [storeCategory, setStoreCategory] = useState<string>("");
	const [storeCity, setStoreCity] = useState<string>("");

	async function onSubmit(e: any) {
		console.log("onSubmit success");
		e.preventDefault();

		const options = {
			method: "POST",
			// mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				store_name: storeName,
				store_address: storeAddress,
				store_category: storeCategory,
				store_city: storeCity,
			}),
		};
		try {
			const response = await fetch(
				"http://localhost:5000/sellers/registration",
				options
			);

			// setIsError(false);
			// setIsLoading(true);

			if (!response.ok) {
				throw new Error("Error fetching");
			}
			const data = await response.json();
			// Update component state with fetched data
			console.log(data.token);
			const token = String(data.token);
			localStorage.setItem("token", token);

			setTimeout(() => {
				alert("Seller Registered successfully");
				Navigate("/");
			}, 1000);
		} catch (error) {
			alert(error);
		}
	}

	return (
		<MDBContainer fluid>
			<MDBRow>
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
					crossOrigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="./assets/css/style.css"
				/>

				<MDBCol sm="6">
					<div className="d-flex flex-row mb-2">
						<nav className="navbar navbar-light fw-normal mb-5 pb-1 ">
							<a
								className="navbar-brand"
								href="#"
							>
								<img
									src={logo}
									width="70"
									height="70"
									alt="logo"
								/>
							</a>
						</nav>
					</div>

					<div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
						<h3
							className="fw-normal mb-3 ps-5 pb-3"
							style={{ letterSpacing: "1px" }}
						>
							Hi! Join our seller squad! Please complete below form:
						</h3>
						<form onSubmit={onSubmit}>
							<MDBInput
								wrapperClass="mb-4 mx-5 w-100"
								label="Business Name"
								id="storeName"
								type="name"
								size="lg"
								value={storeName}
								onChange={(e) => setStoreName(e.target.value)}
							/>
							<MDBInput
								wrapperClass="mb-4 mx-5 w-100"
								label="Store address"
								id="storeAddress"
								type="address"
								size="lg"
								value={storeAddress}
								onChange={(e) => setStoreAddress(e.target.value)}
							/>
							<MDBInput
								wrapperClass="mb-4 mx-5 w-100"
								label="Store Category"
								id="storeCategory"
								type="storeCategory"
								size="lg"
								value={storeCategory}
								onChange={(e) => setStoreCategory(e.target.value)}
							/>
							<MDBInput
								wrapperClass="mb-4 mx-5 w-100"
								label="City"
								id="storeCity"
								type="name"
								size="lg"
								value={storeCity}
								onChange={(e) => setStoreCity(e.target.value)}
							/>

							{/* <MDBBtn
							className="mb-4 px-5 mx-5 w-100"
							size="lg"
						>
							Register
						</MDBBtn> */}
							<MDBBtnGroup
								size="lg"
								className="mb-4 px-5 mx-5 w-100"
							>
								<button
									className="mb-4 px-5 mx-5 w-100 btn-primary "
									// size="lg"
									type="submit"
								>
									Register your Store
								</button>
							</MDBBtnGroup>
						</form>
						<p className="small mb-5 pb-lg-3 ms-5">
							{/* <a
								className="text-muted"
								href="#!"
							>
								Forgot password?
							</a> */}
						</p>
						<p className="ms-5">
							Already have an account?{" "}
							<a
								href="/sellerDashboard"
								className="link-info"
							>
								Login here
							</a>
						</p>
					</div>
				</MDBCol>

				<MDBCol
					sm="6"
					className="d-none d-sm-block px-0"
				>
					<img
						src={signup_img}
						alt="Login image"
						className=" w-100 vh-100"
						style={{ objectFit: "cover" }}
					/>
				</MDBCol>
			</MDBRow>
			<script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
				crossOrigin="anonymous"
			></script>
		</MDBContainer>
	);
}

export default SellerReg;
function sessionmaker(engine: any): any {
	throw new Error("Function not implemented.");
}
