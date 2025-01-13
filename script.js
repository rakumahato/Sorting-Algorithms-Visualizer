let array = [];
let sorting = false; 
let comparisonCount = 0; 

function generateArray() {
    if (sorting) return; 
    comparisonCount = 0; 
    document.getElementById("comparison-count").textContent = "Comparisons: 0"; 
    array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    drawArray();
    hideComplexityInfo(); 
}

function drawArray() {
    const container = document.getElementById("array-container");
    container.innerHTML = ""; 
    array.forEach((value) => {
        const barContainer = document.createElement("div");
        barContainer.style.position = "relative"; 
        
        
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.className = "bar";
        
        barContainer.appendChild(bar);
        container.appendChild(barContainer);
    });
}

function updateComparisonDisplay() {
    document.getElementById("comparison-count").textContent = `Comparisons: ${comparisonCount}`;
}

function showComplexityInfo(info) {
    const complexityText = document.getElementById("complexity-text");
    complexityText.innerHTML = info;
    document.getElementById("complexity-info").style.display = "block"; 
}

function hideComplexityInfo() {
    document.getElementById("complexity-info").style.display = "none"; 
}

async function bubbleSort() {
    disableButtons(true);
    sorting = true; 
    const arr = [...array];
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comparisonCount++; 
            updateComparisonDisplay(); 

            highlightBars(j, j + 1);
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                array = [...arr];
                drawArray();
                await sleep(100);
            }
            clearHighlightBars(j, j + 1);
        }
    }
    sorting = false; 
    showComplexityInfo("Bubble Sort: Best: O(n), Average: O(n²), Worst: O(n²), Space: O(1)");
    disableButtons(false);
}

async function mergeSort() {
    disableButtons(true);
    sorting = true; 
    const arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    sorting = false; 
    showComplexityInfo("Merge Sort: Best: O(n log n), Average: O(n log n), Worst: O(n log n), Space: O(n)");
    disableButtons(false);
}

async function mergeSortHelper(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(arr, left, mid);
        await mergeSortHelper(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }
}

async function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        comparisonCount++; 
        updateComparisonDisplay();
        highlightBars(k);

        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }

        array = [...arr];
        drawArray();
        await sleep(100);
        clearHighlightBars(k - 1);
    }

    while (i < leftArr.length) {
        comparisonCount++; // Increment comparison count
        updateComparisonDisplay(); // Update display
        highlightBars(k);
        arr[k++] = leftArr[i++];
        array = [...arr];
        drawArray();
        await sleep(100);
        clearHighlightBars(k - 1);
    }

    while (j < rightArr.length) {
        comparisonCount++; // Increment comparison count
        updateComparisonDisplay(); // Update display
        highlightBars(k);
        arr[k++] = rightArr[j++];
        array = [...arr];
        drawArray();
        await sleep(100);
        clearHighlightBars(k - 1);
    }
}

async function quickSort() {
    disableButtons(true);
    sorting = true; // Set sorting to true
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    sorting = false; // Reset sorting when done
    showComplexityInfo("Quick Sort: Best: O(n log n), Average: O(n log n), Worst: O(n²), Space: O(log n)");
    disableButtons(false);
}

async function quickSortHelper(arr, low, high) {
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        comparisonCount++; // Increment comparison count
        updateComparisonDisplay(); // Update display
        highlightBars(j);

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            array = [...arr];
            drawArray();
            await sleep(100);
        }
        clearHighlightBars(j);
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    array = [...arr];
    drawArray();
    await sleep(100);
    return i + 1;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function highlightBars(...indices) {
    const bars = document.querySelectorAll('.bar');
    indices.forEach(index => {
        bars[index].classList.add('active'); // Highlight specified bars
    });
}

function clearHighlightBars(...indices) {
    const bars = document.querySelectorAll('.bar');
    indices.forEach(index => {
        bars[index].classList.remove('active'); 
    });
}

function disableButtons(state) {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.disabled = state; 
    });
}


window.onload = generateArray;
