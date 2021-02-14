const main = () => {
	/** @type {HTMLCanvasElement} */
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");
	const width = 800;
	const height = 800;
	const resolution = 5;

	document.body.style = "margin: 0; height: 100vh; overflow: hidden;";
	canvas.style = "background-color: white; border: 2px solid black;";
	canvas.height = height;
	canvas.width = width;

	const cols = width / resolution;
	const rows = height / resolution;

	const nextGeneration = grid => {
		const nextGenGrid = grid.map(col => [...col]);

		for (let col = 0; col < grid.length; col++) {
			for (let row = 0; row < grid[col].length; row++) {
				const cell = grid[col][row];
				let neighbourAmount = 0;

				for (let i = -1; i < 2; i++) {
					for (let j = -1; j < 2; j++) {
						if (i === 0 && j === 0) {
							continue;
						}

						const xcell = col + i;
						const ycell = row + j;

						if (xcell >= 0 && ycell >= 0 && xcell < cols && ycell < rows) {
							const neighbour = grid[col + i][row + j];

							if (neighbour) {
								neighbourAmount++;
							}
						}
					}
				}

				//rules

				if (cell === 1 && neighbourAmount < 2) {
					nextGenGrid[col][row] = 0;
				}

				if (cell === 1 && neighbourAmount > 3) {
					nextGenGrid[col][row] = 0;
				}

				if (cell === 0 && neighbourAmount === 3) {
					nextGenGrid[col][row] = 1;
				}

				if (Math.round(Math.random() * 10000) < 2) {
					nextGenGrid[col][row] = 1;
				}
			}
		}

		return nextGenGrid;
	};

	const render = grid => {
		for (let col = 0; col < grid.length; col++) {
			for (let row = 0; row < grid[col].length; row++) {
				const cell = grid[col][row];

				ctx.beginPath();
				ctx.rect(col * resolution, row * resolution, resolution, resolution);
				ctx.fillStyle = cell ? "black" : "white";
				ctx.fill();
			}
		}
	};

	const buildGrid = (cols, rows) =>
		new Array(cols).fill(null).map(col => new Array(rows).fill(0));

	const initialGrid = buildGrid(cols, rows);

	const randomizeGrid = grid =>
		grid.map(col => col.map(row => (Math.floor(Math.random() * 2) ? 1 : 0)));

	let grid = randomizeGrid(initialGrid);

	const update = () => {
		grid = nextGeneration(grid);

		render(grid);

		requestAnimationFrame(update);
	};

	requestAnimationFrame(update);
};

main();
