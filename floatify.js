(function () {
	const market_buyorder_info = document.getElementById("market_buyorder_info");
	market_buyorder_info.insertAdjacentHTML("afterend", `
		<style>
		.floatify__wrapper {
		padding: 15px;
		box-shadow: 0 0 0 1px lightgray;
		border-radius: 8px;
		max-width: 949px;
		background-color: black;
		color: white;
		display: flex;
		flex-direction: column;
		}
		.floatify__wrapper p {
		padding-bottom: 5px;
		font-family: sans-serif;
		}
		.floatify__wrapper hr {
		background-color: none;
		width: 100%;
		padding: 0;
		margin: 5px 0;
		border: 1px dashed gray;
		}
		.floatify__wrapper input {
		width: 100%;
		padding: 7px;
		border-radius: 5px;
		background-color: #fff;
		}
		.floatify__tags {
		position: relative;
		padding: 7px 0;
		}
		.floatify__tag {
		background-color: lightgray;
		padding: 7px;
		font-family: sans-serif;
		border-radius: 3px;
		}
		.floatify__tag button {
		background: none;
		border: none;
		outline: none;
		font-size: 16px;
		font-weight: bold;
		color: gray;
		cursor: pointer;
		}
		.floatify__form {
		display: flex;
		gap: 10px;
		}
		.floatify__submit {
		background-color: #1976d2;
		color: white;
		border: none;
		outline: none;
		border-radius: 4px;
		width: 15%;
		cursor: pointer;
		}
		.floatify__reload {
		background-color: green;
		color: white;
		border: none;
		outline: none;
		border-radius: 4px;
		width: 15%;
		cursor: pointer;
		}
		</style>
		<div class="floatify">
			<fieldset class="floatify__wrapper">
				<p>Type in your float pattern</p>
				<div class="floatify__form">
					<input type="text">
					<button class="floatify__reload">Reload</button>
					<button class="floatify__submit">OK</button>			
				</div>
				<hr>
				<div class="floatify__tags"></div>
			</fieldset>
		</div>
	`);

	function search_float_pattern(combination_array) {
		let float_list = document.querySelectorAll("div.itemfloat span.value");

		float_list.forEach((item) => {
			combination_array.forEach((combination) => {
				if (item.textContent.trim().indexOf(combination) != -1) {
					item.style.cssText =
						"background-color: yellow; color: black; padding: 2px;";
					item.dataset.styled = "true";
				}
			});
		});
	}

	let floatifyArray = [];
	let floatify__submit = document.querySelector(".floatify__submit");
	let floatify__form = document.querySelector(".floatify__form");
	let floatify__tags = document.querySelector(".floatify__tags");
	let floatify__reload = document.querySelector(".floatify__reload");

	floatify__submit.addEventListener("click", () => {
		floatifyArray = floatify__form.querySelector("input").value.split(" ");
		floatify__tags.innerHTML = "";
		floatifyArray.forEach((tag) => {
			floatify__tags.insertAdjacentHTML(
				"beforeend",
				`
			<span class="floatify__tag">${tag} <button data-delete-tag="${tag}">&times;</button></span>`
			);
		});
		document.querySelectorAll("[data-delete-tag]").forEach((btn) => {
			btn.addEventListener("click", function () {
				floatifyArray.splice(
					floatifyArray.indexOf(this.closest("span").textContent.replace(" ×", "")),
					1
				);
				document.querySelectorAll("div.itemfloat span.value").forEach((span) => {
					span.style.cssText = "";
				});
				search_float_pattern(floatifyArray);
				this.closest("span").remove();
			});
		});
		document.querySelectorAll("div.itemfloat span.value").forEach((span) => {
			span.style.cssText = "";
		});
		search_float_pattern(floatifyArray);
		floatify__form.querySelector("input").value = "";
	});
	floatify__reload.addEventListener("click", () => {
		search_float_pattern(floatifyArray);
	});
})();