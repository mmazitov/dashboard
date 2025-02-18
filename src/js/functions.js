// Initialize charts when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
	initCharts();
});

// Function to initialize all charts
const initCharts = () => {
	initChartRLQ();
	initChartMZI();
	initChartSurvey();
	initChartKP();
	initChartKI();
};

// Function to create a chart with given parameters
const createChart = (ctx, type, data, options, plugins = []) => {
	// eslint-disable-next-line no-undef
	return new Chart(ctx, {
		type,
		data,
		options,
		plugins,
	});
};

// Initialize RLQ chart
const initChartRLQ = () => {
	const ctx = document.getElementById("chart__area");
	if (!ctx) return;
	const data = getRLQData();
	const options = getRLQOptions();
	createChart(ctx, "line", data, options);
	styleChartArea(ctx, "0 0 10px 10px", "rgba(241, 140, 92, 0.08)", 136);
};

// Get data for RLQ chart
const getRLQData = () => ({
	labels: Array(16).fill(""),
	datasets: [
		{
			label: "first",
			data: [50, 47, 44, 42, 42, 44, 46, 47, 45, 43, 39, 36, 35, 35, 36, 40],
			fill: true,
			borderWidth: 0,
			tension: 0.4,
			backgroundColor: "rgba(241, 140, 92, 1)",
			pointRadius: 0,
		},
		{
			label: "second",
			data: [50, 47, 44, 47, 49, 51, 52, 52, 51, 50, 49, 47, 45, 43, 41, 39],
			fill: true,
			borderWidth: 0,
			tension: 0.4,
			backgroundColor: "rgba(241, 140, 92, 0.32)",
			pointRadius: 0,
		},
	],
});

// Get options for RLQ chart
const getRLQOptions = () => ({
	plugins: {
		legend: { display: false },
		annotation: {
			drawTime: "afterDatasetsDraw",
			annotations: createAnnotations(0, 100, 1, 14, "#f0eae9", 1),
		},
	},
	scales: createScales(0, 100),
});

// Create annotations for the chart
const createAnnotations = (minY, maxY, xStart, xEnd, color, lineSize) => {
	const annotations = {};
	for (let i = 0; i < 4; i++) {
		const yPosition = maxY - (12 + i * 12);
		annotations[`line${i + 1}`] = {
			type: "line",
			yMin: yPosition,
			yMax: yPosition,
			xMin: xStart,
			xMax: xEnd,
			borderColor: color,
			borderWidth: lineSize,
		};
	}
	return annotations;
};

// Create scales for the chart
const createScales = (minY, maxY) => ({
	x: {
		ticks: { display: false },
		grid: { display: false },
		border: { display: false },
	},
	y: {
		ticks: { display: false },
		grid: { display: false, drawTicks: false },
		min: minY,
		max: maxY,
		border: { display: false },
	},
});

// Style the chart area
const styleChartArea = (ctx, borderRadius, backgroundColor, height) => {
	ctx.style.borderRadius = borderRadius;
	ctx.style.backgroundColor = backgroundColor;
	ctx.height = height;
};

// Initialize MZI chart with adjusted height
const initChartMZI = () => {
	const ctx = document.getElementById("chart__doughnut--mzi");
	if (!ctx) return;
	const data = getMZIData();
	const options = getMZIOptions();
	createChart(ctx, "doughnut", data, options, [drawIconsPlugin()]);
	adjustChartHeight(ctx, 10);
};

// Adjust the chart height based on the container's height
const adjustChartHeight = (ctx, adjustment) => {
	const container = ctx.parentElement;
	if (!container) return;
	const containerHeight = container.clientHeight;
	ctx.height = containerHeight + adjustment;
};

// Get data for MZI chart
const getMZIData = () => ({
	labels: ["Angry", "Neutral", "Happy"],
	datasets: [
		{
			data: [33.33, 33.33, 33.34],
			backgroundColor: Array(3).fill("rgba(217, 217, 217, 1)"),
			hoverBackgroundColor: Array(3).fill("rgba(217, 217, 217, 1)"),
			borderWidth: 1,
			borderColor: "rgba(217, 217, 217, 1)",
			hoverBorderColor: "rgba(217, 217, 217, 1)",
		},
	],
});

// Get options for MZI chart
const getMZIOptions = () => ({
	radius: "85%",
	cutout: "80%",
	circumference: 220,
	rotation: 250,
	responsive: false,
	layout: {
		padding: {
			top: 3,
		},
	},
	plugins: {
		legend: { display: false },
		tooltip: { enabled: false },
	},
});

// Plugin to draw icons on the chart
const drawIconsPlugin = () => ({
	id: "drawIcons",
	afterDraw: (chart) => {
		const ctx = chart.ctx;
		ctx.save();
		const meta = chart.getDatasetMeta(0);
		meta.data.forEach((element, index) => {
			const { outerRadius, innerRadius } = element;
			const middleRadius = (outerRadius + innerRadius) / 2;
			const angle = calculateAngle(element, index);
			const x = element.x + Math.cos(angle) * middleRadius;
			const y = element.y + Math.sin(angle) * middleRadius;
			drawIcon(ctx, x, y, index);
		});
		ctx.restore();
	},
});

// Calculate angle for icon placement
const calculateAngle = (element, index) => {
	if (index === 0) return element.startAngle;
	if (index === 2) return element.endAngle;
	return element.startAngle + (element.endAngle - element.startAngle) / 2;
};

// Draw icon on the chart
const drawIcon = (ctx, x, y, index) => {
	const iconSize = 24;
	const borderSize = 4;
	const borderColor = "#fff";
	const icons = ["😡", "😐", "😀"];
	const maskColor = "rgba(255, 255, 255, 0.32)";

	ctx.globalAlpha = 1;
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(x, y, iconSize / 2 + borderSize, 0, Math.PI * 2);
	ctx.fill();
	ctx.lineWidth = borderSize;
	ctx.strokeStyle = borderColor;
	ctx.stroke();

	ctx.font = `${iconSize}px Arial`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "black";
	ctx.fillText(icons[index], x, y);

	ctx.globalAlpha = 1;
	ctx.fillStyle = maskColor;
	ctx.beginPath();
	ctx.arc(x, y, iconSize / 2, 0, Math.PI * 2);
	ctx.fill();
};

// Initialize Survey chart
const initChartSurvey = () => {
	const ctx = document.getElementById("chart__bar--survey");
	if (!ctx) return;
	const data = getSurveyData();
	const options = getSurveyOptions();
	createChart(ctx, "bar", data, options);
};

// Get data for Survey chart
const getSurveyData = () => ({
	labels: Array.from({ length: 12 }, (_, i) => String.fromCharCode(65 + i)),
	datasets: [
		{
			data: [4.3, 1.8, 2.3, 4.3, 1.3, 4.3, 4.3, 1.9, 2.3, 4.3, 1.3, 4.3],
			backgroundColor: ["rgba(241, 140, 92, 1)"],
			borderWidth: 0,
			barThickness: 15,
			borderRadius: { topLeft: 6, topRight: 6, bottomRight: 0, bottomLeft: 0 },
		},
	],
});

// Get options for Survey chart
const getSurveyOptions = () => ({
	plugins: {
		legend: { display: false },
	},
	scales: {
		y: {
			beginAtZero: false,
			min: 1,
			max: 5,
			ticks: {
				stepSize: 1,
				font: { family: "Inter", size: 12 },
				color: "rgba(97, 110, 133, 1)",
				padding: 0,
				callback: (value) => `${value} \u00A0\u00A0\u00A0`,
			},
			grid: { drawTicks: false },
			border: { display: false },
		},
		x: {
			ticks: { font: { family: "Inter", size: 12 }, color: "rgba(97, 110, 133, 1)" },
			grid: { display: false },
		},
	},
});

// Initialize KP chart
const initChartKP = () => {
	const ctx = document.getElementById("chart__bar--kp");
	if (!ctx) return;
	const data = getKPData();
	const options = getKPOptions();
	const chart = createChart(ctx, "bar", data, options);
	chart.options.plugins.legend.onClick = () => {};
};

// Get data for KP chart
const getKPData = () => ({
	labels: ["KP1", "KP2", "KP3", "KP4", "KP5"],
	datasets: [
		{
			label: "KP Value",
			data: [85, 70, 20, 60, 20],
			backgroundColor: [
				"rgba(81, 85, 195, 1)",
				"rgba(89, 125, 190, 1)",
				"rgba(95, 153, 187, 1)",
				"rgba(101, 184, 183, 1)",
				"rgba(108, 221, 177, 1)",
			],
			borderWidth: 0,
			barThickness: "flex",
			borderRadius: { topLeft: 6, topRight: 6, bottomRight: 0, bottomLeft: 0 },
		},
	],
});

// Get options for KP chart
const getKPOptions = () => ({
	plugins: {
		legend: {
			display: true,
			position: "bottom",
			labels: {
				font: { family: "Inter", size: 12 },
				color: "rgba(97, 110, 133, 1)",
				boxWidth: 12,
				boxHeight: 12,
				generateLabels: (chart) => generateLegendLabels(chart),
			},
		},
	},
	layout: {
		margin: {
			bottom: 5, // Add padding before the legend
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			min: 0,
			max: 100,
			ticks: {
				stepSize: 25,
				font: { family: "Inter", size: 12 },
				color: "rgba(97, 110, 133, 1)",
				callback: (value) => `${value}%  \u00A0\u00A0\u00A0`,
			},
			grid: { drawTicks: false },
			border: { display: false },
		},
		x: {
			ticks: { font: { family: "Inter", size: 12 }, color: "rgba(97, 110, 133, 1)" },
			grid: { display: false },
		},
	},
});

// Generate legend labels for KP chart
const generateLegendLabels = (chart) => {
	const data = chart.data;
	if (data.labels.length && data.datasets.length) {
		return data.labels.map((label, i) => {
			const dataset = data.datasets[0];
			return {
				text: label,
				fillStyle: dataset.backgroundColor[i],
				hidden: false,
				lineCap: "butt",
				lineDash: [],
				lineDashOffset: 0,
				lineJoin: "miter",
				lineWidth: 1,
				strokeStyle: dataset.backgroundColor[i],
				pointStyle: "rectRounded",
				borderRadius: 4,
				rotation: 0,
			};
		});
	}
	return [];
};

// Initialize KI chart
const initChartKI = () => {
	const container = document.querySelector(".chart__doughnut--ki");
	const inner = container.querySelector(".chart__ki--outer");
	const outer = container.querySelector(".chart__ki--inner");

	const totalDegrees = 210;
	// Outer circle with 40 ticks
	const numberOfTicksOuter = 40;

	const degreesPerTickOuter = totalDegrees / (numberOfTicksOuter - 1);

	for (let i = 0; i < numberOfTicksOuter; i++) {
		const tick = document.createElement("div");
		tick.className = "tick";
		tick.style.transform = `rotate(${i * degreesPerTickOuter}deg)`;
		outer.appendChild(tick);
	}

	// Inner circle with 46 ticks
	const numberOfTicksInner = 46;
	const degreesPerTickInner = totalDegrees / (numberOfTicksInner - 1);

	for (let i = 0; i < numberOfTicksInner; i++) {
		const tick = document.createElement("div");
		tick.className = "tick";
		tick.style.transform = `rotate(${i * degreesPerTickInner}deg)`;
		inner.appendChild(tick);
	}
};
