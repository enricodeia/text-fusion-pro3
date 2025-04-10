// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
if (typeof CustomEase !== 'undefined') {
  gsap.registerPlugin(CustomEase);
}

// Tab navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
});

// Element selections - Core Elements
const animationSelect = document.getElementById("animation-select");
const splitCharsBtn = document.getElementById("split-chars");
const splitWordsBtn = document.getElementById("split-words");
const splitLinesBtn = document.getElementById("split-lines");
const staggerOrderSelect = document.getElementById("stagger-order");
const speedSlider = document.getElementById("speed-slider");
const speedValue = document.getElementById("speed-value");
const delaySlider = document.getElementById("delay-slider");
const delayValue = document.getElementById("delay-value");
const easeSelect = document.getElementById("ease-select");
const easePath = document.getElementById("ease-path");
const easeDot = document.getElementById("ease-dot");
const easeHandle1 = document.getElementById("ease-handle-1");
const easeHandle2 = document.getElementById("ease-handle-2");

// Text Styling Elements
const fontSizeInput = document.getElementById("font-size");
const fontSizeValue = document.getElementById("font-size-value");
const fontSelect = document.getElementById("font-select");
const textColorInput = document.getElementById("text-color");
const colorTextValue = document.getElementById("color-text-value");
const letterSpacingInput = document.getElementById("letter-spacing");
const spacingValue = document.getElementById("spacing-value");
const textWeightSelect = document.getElementById("text-weight");
const textTransformSelect = document.getElementById("text-transform");
const textShadowInput = document.getElementById("text-shadow");
const shadowValue = document.getElementById("shadow-value");

// Text Content Elements
const customTextInput = document.getElementById("custom-text");

// Advanced Setting Elements
const offsetYInput = document.getElementById("offset-y");
const offsetYValue = document.getElementById("offset-y-value");
const offsetXInput = document.getElementById("offset-x");
const offsetXValue = document.getElementById("offset-x-value");
const rotationInput = document.getElementById("rotation");
const rotationValue = document.getElementById("rotation-value");
const blurEffectInput = document.getElementById("blur-effect");
const blurValue = document.getElementById("blur-value");
const scaleEffectInput = document.getElementById("scale-effect");
const scaleValue = document.getElementById("scale-value");
const use3dInput = document.getElementById("use-3d");
const useMultiColorInput = document.getElementById("use-multi-color");
const iterationsInput = document.getElementById("iterations");
const iterationsValue = document.getElementById("iterations-value");
const particlesEffectInput = document.getElementById("particles-effect");

// Text Mask Elements
const useMaskInput = document.getElementById("use-mask");
const maskControls = document.querySelector(".mask-options");
const maskTypeSelect = document.getElementById("mask-type-select");
const customMaskControls = document.getElementById("custom-mask-controls");
const customSvgPath = document.getElementById("custom-svg-path");

// UI Control Elements
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const underlineBtn = document.getElementById("underline-btn");
const codeOutput = document.getElementById("code-output");
const codeCopyMsg = document.getElementById("code-copy-msg");
const resetBtn = document.getElementById("reset-btn");
const randomBtn = document.getElementById("random-btn");
const copyBtn = document.getElementById("copy-btn");
const exportBtn = document.getElementById("export-btn");
const playBtn = document.getElementById("play-btn");
const advancedToggle = document.querySelector(".advanced-toggle");
const advancedOptions = document.querySelector(".advanced-options");
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");
const toast = document.getElementById("toast");
const timelineSlider = document.getElementById("timeline-slider");
const timelinePlay = document.getElementById("timeline-play");
const timelinePause = document.getElementById("timeline-pause");
const timelineReset = document.getElementById("timeline-reset");

// Preview Elements
const preview = document.getElementById("preview");
const previewText = preview ? preview.querySelector(".preview-text") : null;
const deviceButtons = document.querySelectorAll(".device-btn");

// Global SplitType instance for preview
let splitPreview;
let activeTimeline = null;

// Global split type (chars, words, lines)
let currentSplitType = 'chars';

// Text styling state
let isBold = true;
let isItalic = false;
let isUnderlined = false;

// Ease motion paths for visualization
const easePaths = {
  'power2.out': "M0,200 C40,120 160,80 200,0",
  'power3.out': "M0,200 C60,180 180,20 200,0",
  'power4.out': "M0,200 C80,200 160,20 200,0",
  'back.out(1.7)': "M0,200 C40,180 140,-40 200,0",
  'elastic.out(1, 0.3)': "M0,200 C40,160 60,0 100,0 S140,160 160,0 S180,100 200,0",
  'bounce.out': "M0,200 C60,200 80,0 100,80 S120,200 140,80 S160,0 180,40 S190,80 200,0",
  'sine.inOut': "M0,200 S60,0 140,0 S200,200 200,0",
  'steps(5)': "M0,200 L40,200 L40,0 L80,0 L80,200 L120,200 L120,0 L160,0 L160,200 L200,0",
  'circ.out': "M0,200 C120,200 200,0 200,0",
  'expo.out': "M0,200 C100,200 160,0 200,0",
  'custom': "M0,200 C40,120 160,80 200,0"
};

// Syntax highlighting for code output
function highlightSyntax(code) {
  code = code
    .replace(/\b(const|let|var|function|return|import|export|from|if|else|for|while|switch|case|break|continue|default|try|catch|finally|new|this|typeof|instanceof)\b/g, '<span class="keyword">$1</span>')
    .replace(/\b(gsap|timeline|to|from|set|stagger|fromTo|ScrollTrigger|create|SplitType)\b/g, '<span class="function">$1</span>')
    .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
    .replace(/'([^']*)'/g, "<span class='string'>'$1'</span>")
    .replace(/`([^`]*)`/g, "<span class='string'>`$1`</span>")
    .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>')
    .replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>');
  return code;
}

// Toggle sidebar on mobile
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    
    // Change toggle icon based on sidebar state
    if (sidebar.classList.contains("open")) {
      sidebarToggle.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      sidebarToggle.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    }
  });
}

// Toggle mask options visibility
if (useMaskInput && maskControls) {
  useMaskInput.addEventListener("change", () => {
    maskControls.style.display = useMaskInput.checked ? "block" : "none";
    updateAnimation();
  });
}

// Toggle custom path editor based on mask type
if (maskTypeSelect && customMaskControls) {
  maskTypeSelect.addEventListener("change", () => {
    customMaskControls.style.display = maskTypeSelect.value === "custom" ? "block" : "none";
    updateAnimation();
  });
}

// Toggle advanced settings
if (advancedToggle && advancedOptions) {
  advancedToggle.addEventListener("click", () => {
    advancedToggle.classList.toggle("open");
    advancedOptions.classList.toggle("open");
  });
}

// Change preview device size
deviceButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    deviceButtons.forEach(btn => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");
    
    if (!preview || !previewText) return;
    
    // Get device type
    const deviceType = button.dataset.device;
    
    // Remove all device classes
    preview.classList.remove("desktop", "tablet", "mobile");
    
    // Add selected device class
    preview.classList.add(deviceType);
    
    // Adjust font size based on device
    if (deviceType === "mobile") {
      previewText.style.fontSize = `${parseInt(fontSizeInput.value) * 0.7}px`;
    } else if (deviceType === "tablet") {
      previewText.style.fontSize = `${parseInt(fontSizeInput.value) * 0.85}px`;
    } else {
      previewText.style.fontSize = `${fontSizeInput.value}px`;
    }
  });
});

// Make an element draggable within the ease visualization
function makeDraggable(elem) {
  if (!elem) return;
  
  let active = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  const container = document.querySelector('.ease-visualization');
  if (!container) return;
  
  elem.addEventListener('mousedown', dragStart);
  elem.addEventListener('touchstart', dragStart);
  
  document.addEventListener('mouseup', dragEnd);
  document.addEventListener('touchend', dragEnd);
  
  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);
  
  function dragStart(e) {
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - elem.offsetLeft;
      initialY = e.touches[0].clientY - elem.offsetTop;
    } else {
      initialX = e.clientX - elem.offsetLeft;
      initialY = e.clientY - elem.offsetTop;
    }
    
    active = true;
  }
  
  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    active = false;
    
    // Update the ease path after dragging ends
    if (easeSelect && easeSelect.value === 'custom') {
      updateEaseVisualization();
      updateAnimation();
    }
  }
  
  function drag(e) {
    if (active) {
      e.preventDefault();
      
      if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }
      
      // Calculate bounds relative to container
      const bounds = container.getBoundingClientRect();
      const minX = 0;
      const maxX = bounds.width - elem.offsetWidth;
      const minY = 0;
      const maxY = bounds.height - elem.offsetHeight;
      
      // Constrain to bounds
      currentX = Math.max(minX, Math.min(currentX, maxX));
      currentY = Math.max(minY, Math.min(currentY, maxY));
      
      // Update position
      elem.style.left = currentX + 'px';
      elem.style.top = currentY + 'px';
      
      // Update the path in real-time while dragging
      if (easeSelect && easeSelect.value === 'custom' && easeHandle1 && easeHandle2 && easePath) {
        const handle1X = parseInt(easeHandle1.style.left) || 40;
        const handle1Y = parseInt(easeHandle1.style.top) || 120;
        const handle2X = parseInt(easeHandle2.style.left) || 160;
        const handle2Y = parseInt(easeHandle2.style.top) || 80;
        
        // Create updated bezier curve path
        const path = `M0,200 C${handle1X},${handle1Y} ${handle2X},${handle2Y} 200,0`;
        easePath.setAttribute("d", path);
      }
    }
  }
}

// Update easing visualization
function updateEaseVisualization() {
  if (!easeSelect || !easePath || !easeDot) return;
  
  const ease = easeSelect.value;
  
  // Hide handles by default
  if (easeHandle1 && easeHandle2) {
    easeHandle1.style.display = 'none';
    easeHandle2.style.display = 'none';
  }
  
  if (ease === 'custom') {
    // Show handles for custom ease
    if (easeHandle1 && easeHandle2) {
      easeHandle1.style.display = 'block';
      easeHandle2.style.display = 'block';
      
      // Use current handle positions to create the path
      const handle1X = parseInt(easeHandle1.style.left) || 40;
      const handle1Y = parseInt(easeHandle1.style.top) || 120;
      const handle2X = parseInt(easeHandle2.style.left) || 160;
      const handle2Y = parseInt(easeHandle2.style.top) || 80;
      
      // Create bezier curve path
      const path = `M0,200 C${handle1X},${handle1Y} ${handle2X},${handle2Y} 200,0`;
      easePath.setAttribute("d", path);
      
      // Make handles draggable
      makeDraggable(easeHandle1);
      makeDraggable(easeHandle2);
    }
  } else {
    // Use predefined path from easePaths object
    const path = easePaths[ease] || "M0,200 C40,120 160,80 200,0";
    easePath.setAttribute("d", path);
  }
  
  // Animate the dot along the path
  gsap.killTweensOf(easeDot);
  gsap.to(easeDot, {
    duration: parseFloat(speedSlider.value),
    ease: ease === 'custom' && typeof CustomEase !== 'undefined' ? createCustomEase() : ease,
    x: 190,
    onUpdate: function() {
      const progress = this.progress();
      const pathLength = easePath.getTotalLength();
      const point = easePath.getPointAtLength(progress * pathLength);
      easeDot.style.left = `${point.x}px`;
      easeDot.style.top = `${point.y}px`;
    },
    onComplete: function() {
      gsap.to(easeDot, {
        duration: 0.5,
        x: 0,
        ease: "power2.inOut",
        onComplete: function() {
          if (document.activeElement === easeSelect) {
            updateEaseVisualization();
          }
        }
      });
    }
  });
}

// Create custom ease function from handle positions
function createCustomEase() {
  if (typeof CustomEase === 'undefined' || !easeHandle1 || !easeHandle2) {
    return "power2.out";
  }
  
  // Get handle positions as percentages (normalize to 0-1 range)
  const handle1X = (parseInt(easeHandle1.style.left) || 40) / 200;
  const handle1Y = 1 - (parseInt(easeHandle1.style.top) || 120) / 200;
  const handle2X = (parseInt(easeHandle2.style.left) || 160) / 200;
  const handle2Y = 1 - (parseInt(easeHandle2.style.top) || 80) / 200;
  
  // Create a CustomEase
  return CustomEase.create("custom", `M0,0 C${handle1X},${handle1Y} ${handle2X},${handle2Y} 1,1`);
}

// Update value displays
function updateValueDisplays() {
  if (speedValue) speedValue.textContent = speedSlider.value;
  if (delayValue) delayValue.textContent = delaySlider.value;
  if (fontSizeValue) fontSizeValue.textContent = `${fontSizeInput.value}px`;
  if (spacingValue) spacingValue.textContent = `${letterSpacingInput.value}px`;
  if (shadowValue) shadowValue.textContent = `${textShadowInput.value}px`;
  if (offsetYValue) offsetYValue.textContent = `${offsetYInput.value}px`;
  if (offsetXValue) offsetXValue.textContent = `${offsetXInput.value}px`;
  if (rotationValue) rotationValue.textContent = `${rotationInput.value}°`;
  if (blurValue) blurValue.textContent = `${blurEffectInput.value}px`;
  if (scaleValue) scaleValue.textContent = scaleEffectInput.value;
  if (iterationsValue) iterationsValue.textContent = iterationsInput.value;
  if (colorTextValue && textColorInput) colorTextValue.value = textColorInput.value;
}

// Handle split type buttons
function handleSplitTypeChange() {
  if (!splitCharsBtn || !splitWordsBtn || !splitLinesBtn) return;
  
  splitCharsBtn.classList.toggle("active", currentSplitType === 'chars');
  splitWordsBtn.classList.toggle("active", currentSplitType === 'words');
  splitLinesBtn.classList.toggle("active", currentSplitType === 'lines');
  updateAnimation();
}

if (splitCharsBtn) {
  splitCharsBtn.addEventListener("click", () => {
    currentSplitType = 'chars';
    handleSplitTypeChange();
  });
}

if (splitWordsBtn) {
  splitWordsBtn.addEventListener("click", () => {
    currentSplitType = 'words';
    handleSplitTypeChange();
  });
}

if (splitLinesBtn) {
  splitLinesBtn.addEventListener("click", () => {
    currentSplitType = 'lines';
    handleSplitTypeChange();
  });
}

// Update preview text
function updatePreviewText() {
  if (!customTextInput || !previewText) return;
  
  const text = customTextInput.value;
  previewText.textContent = text;
  updateTextStyle();
  updateAnimation();
}

// Sync custom text with preview
if (customTextInput) {
  customTextInput.addEventListener("input", updatePreviewText);
}

// Handle text style buttons
if (boldBtn) {
  boldBtn.addEventListener("click", () => {
    isBold = !isBold;
    boldBtn.classList.toggle("active", isBold);
    updateTextStyle();
  });
}

if (italicBtn) {
  italicBtn.addEventListener("click", () => {
    isItalic = !isItalic;
    italicBtn.classList.toggle("active", isItalic);
    updateTextStyle();
  });
}

if (underlineBtn) {
  underlineBtn.addEventListener("click", () => {
    isUnderlined = !isUnderlined;
    underlineBtn.classList.toggle("active", isUnderlined);
    updateTextStyle();
  });
}

// Update text styling
function updateTextStyle() {
  if (!previewText) return;
  
  const fontSize = fontSizeInput.value;
  const fontFamily = fontSelect.value;
  const textColor = textColorInput.value;
  const letterSpacing = letterSpacingInput.value + "px";
  const fontWeight = isBold ? (textWeightSelect.value || "700") : "400";
  const fontStyle = isItalic ? "italic" : "normal";
  const textDecoration = isUnderlined ? "underline" : "none";
  const textTransform = textTransformSelect.value;
  const shadowSize = textShadowInput.value;
  const textShadow = shadowSize > 0 ? `0 0 ${shadowSize}px rgba(0,0,0,0.5)` : "none";
  
  // Get active device
  const activeDevice = document.querySelector(".device-btn.active");
  if (!activeDevice) return;
  
  const deviceType = activeDevice.dataset.device;
  
  // Adjust font size based on device
  let adjustedFontSize = fontSize;
  if (deviceType === "mobile") {
    adjustedFontSize = parseInt(fontSize) * 0.7;
  } else if (deviceType === "tablet") {
    adjustedFontSize = parseInt(fontSize) * 0.85;
  }
  
  previewText.style.fontSize = `${adjustedFontSize}px`;
  previewText.style.fontFamily = fontFamily;
  previewText.style.color = textColor;
  previewText.style.letterSpacing = letterSpacing;
  previewText.style.fontWeight = fontWeight;
  previewText.style.fontStyle = fontStyle;
  previewText.style.textDecoration = textDecoration;
  previewText.style.textTransform = textTransform;
  previewText.style.textShadow = textShadow;
  
  updateValueDisplays();
}

// Generate random colors for multi-color effect
function getRandomColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor(Math.random() * 360);
    colors.push(`hsl(${hue}, 80%, 60%)`);
  }
  return colors;
}

// Determine stagger order
function getStaggerConfig() {
  const order = staggerOrderSelect.value;
  const delay = parseFloat(delaySlider.value);
  
  switch (order) {
    case "right": return { each: delay, from: "end" };
    case "center": return { each: delay, from: "center" };
    case "edges": return { each: delay, from: "edges" };
    case "random": return { each: delay, from: "random" };
    default: return { each: delay };
  }
}

// Mask handling
function createTextMask(type) {
  if (!useMaskInput || !useMaskInput.checked || !previewText) return null;
  
  const dimensions = previewText.getBoundingClientRect();
  
  // Create SVG mask container
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", dimensions.width);
  svg.setAttribute("height", dimensions.height);
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.pointerEvents = "none";
  
  // Generate a unique ID for the clip path
  const clipId = `text-clip-${Date.now()}`;
  
  // Create clip path
  const clipPath = document.createElementNS(svgNS, "clipPath");
  clipPath.setAttribute("id", clipId);
  
  // Create mask shape based on type
  let maskShape;
  let animationConfig = {};
  
  switch (type) {
    case "circle":
      maskShape = document.createElementNS(svgNS, "circle");
      maskShape.setAttribute("r", "0");
      maskShape.setAttribute("cx", dimensions.width / 2);
      maskShape.setAttribute("cy", dimensions.height / 2);
      
      animationConfig = {
        attr: { r: Math.max(dimensions.width, dimensions.height) },
        duration: parseFloat(speedSlider.value),
        ease: easeSelect.value === 'custom' && typeof CustomEase !== 'undefined' ? createCustomEase() : easeSelect.value
      };
      break;
      
    case "wipe-right":
      maskShape = document.createElementNS(svgNS, "rect");
      maskShape.setAttribute("y", "0");
      maskShape.setAttribute("height", dimensions.height);
      maskShape.setAttribute("width", "0");
      
      animationConfig = {
        attr: { width: dimensions.width },
        duration: parseFloat(speedSlider.value),
        ease: easeSelect.value === 'custom' && typeof CustomEase !== 'undefined' ? createCustomEase() : easeSelect.value
      };
      break;
      
    case "wipe-left":
      maskShape = document.createElementNS(svgNS, "rect");
      maskShape.setAttribute("y", "0");
      maskShape.setAttribute("height", dimensions.height);
      maskShape.setAttribute("width", "0");
      maskShape.setAttribute("x", dimensions.width);
      
      animationConfig = {
        attr: { x: 0, width: dimensions.width },
        duration: parseFloat(speedSlider.value),
        ease: easeSelect.value === 'custom' && typeof CustomEase !== 'undefined' ? createCustomEase() : easeSelect.value
      };
      break;
      
    case "wipe-up":
      maskShape = document.createElementNS(svgNS, "rect");
      maskShape.setAttribute("x", "0");
      maskShape.setAttribute("width", dimensions.width);
      maskShape.setAttribute("height", "0");
      maskShape.setAttribute("y", dimensions.height);
      
      animationConfig = {
        attr: { y: 0, height: dimensions.height },
        duration: parseFloat(speedSlider.value),
        ease: easeSelect.value === 'custom' && typeof CustomEase !== 'undefined' ? createCustomEase() : easeSelect.value
      };
      break;
      
    case "wipe-down":
      maskShape = document.createElementNS(svgNS, "rect");
      maskShape.setAttribute("x", "0");
      maskShape.setAttribute("width", dimensions.width);
      maskShape.setAttribute("height", "0");
      
      animationConfig = {
        attr: { height: dimensions.height },
        duration: parseFloat(speedSlider.value),
        ease: easeSelect.value === 'custom' && typeof CustomEase !== 'undefined' ? createCustomEase() : easeSelect.value
      };
      break;
      
    case "custom":
      maskShape = document.createElementNS(svgNS, "path");
      maskShape.setAttribute("d", customSvgPath.value || "M0,0 L100,0 L100,100 L0,100 Z");
      // For custom paths, scale the path to fit the text
      gsap.set(maskShape, { scale: 0 });
      animationConfig = {
        scale: 1,
        transformOrigin: "center center",
        duration: parseFloat(speedSlider.value),
        ease: easeSelect.value === 'custom' && typeof CustomEase !== 'undefined' ? createCustomEase() : easeSelect.value
      };
      break;
  }
  
  // Add mask elements to DOM
  clipPath.appendChild(maskShape);
  svg.appendChild(clipPath);
  
  // Apply the mask to the text element
  previewText.style.clipPath = `url(#${clipId})`;
  previewText.parentNode.insertBefore(svg, previewText);
  
  // Clear any existing masks
  if (preview) {
    const existingMasks = preview.querySelectorAll("svg:not(:last-child)");
    existingMasks.forEach(mask => mask.remove());
  }
  
  // Return the timeline
  const tl = gsap.timeline();
  tl.to(maskShape, animationConfig);
  
  return tl;
}

// Create particles effect
function createParticlesEffect(elements) {
  if (!particlesEffectInput || !particlesEffectInput.checked || !elements || elements.length === 0) return null;
  
  // Store original positions
  const originalPositions = [];
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const computed = window.getComputedStyle(el);
    
    originalPositions.push({
      x: gsap.getProperty(el, "x") || 0,
      y: gsap.getProperty(el, "y") || 0,
      rotation: gsap.getProperty(el, "rotation") || 0,
      opacity: parseFloat(computed.opacity) || 1,
      scale: gsap.getProperty(el, "scale") || 1
    });
  });
  
  // Create timeline for explosion and return to original state
  const tl = gsap.timeline({ paused: true });
  
  // Animate each character to a random position
  tl.to(elements, {
    x: () => gsap.utils.random(-100, 100),
    y: () => gsap.utils.random(-100, 100),
    opacity: 0.3,
    scale: () => gsap.utils.random(0.5, 1.5),
    rotation: () => gsap.utils.random(-90, 90),
    duration: 0.8,
    ease: "power2.out",
    stagger: {
      each: 0.02,
      from: "random"
    }
  });
  
  // Return to original positions
  tl.to(elements, {
    x: (i) => originalPositions[i].x,
    y: (i) => originalPositions[i].y,
    opacity: (i) => originalPositions[i].opacity,
    scale: (i) => originalPositions[i].scale,
    rotation: (i) => originalPositions[i].rotation,
    duration: 1.2,
    ease: "elastic.out(1, 0.3)",
    stagger: {
      each: 0.03,
      from: staggerOrderSelect.value === "default" ? "start" : staggerOrderSelect.value
    }
  });
  
  return tl;
}

// Create animation timeline
function createAnimationTimeline(elements) {
  if (!elements || elements.length === 0) return gsap.timeline();
  
  const animationType = animationSelect.value;
  const speed = parseFloat(speedSlider.value);
  const ease = easeSelect.value === 'custom' && typeof CustomEase !== 'undefined' ? createCustomEase() : easeSelect.value;
  const offsetY = parseInt(offsetYInput.value);
  const offsetX = parseInt(offsetXInput.value);
  const rotation = parseInt(rotationInput.value);
  const blurEffect = parseInt(blurEffectInput.value);
  const scaleEffect = parseFloat(scaleEffectInput.value);
  const use3d = use3dInput && use3dInput.checked;
  const useMultiColor = useMultiColorInput && useMultiColorInput.checked;
  const iterations = parseInt(iterationsInput.value);
  const stagger = getStaggerConfig();
  
  // Create timeline with repeat if specified
  let tl = gsap.timeline({ 
    repeat: iterations, 
    repeatDelay: 0.5,
    onUpdate: function() {
      // Update timeline slider
      if (timelineSlider) timelineSlider.value = tl.progress() * 100;
    },
    paused: true // Start paused to allow manual control
  });
  
  // Check if we're using a mask
  if (useMaskInput && useMaskInput.checked && maskTypeSelect) {
    const maskType = maskTypeSelect.value;
    const maskTl = createTextMask(maskType);
    if (maskTl) {
      tl.add(maskTl, 0);
    }
  }
  
  let colors = null;
  if (useMultiColor) {
    colors = getRandomColors(elements.length);
  }
  
  if (use3d && elements[0]) {
    const container = elements[0].parentElement;
    if (container) container.style.perspective = "1000px";
  }
  
  const blurFilter = blurEffect > 0 ? `blur(${blurEffect}px)` : 'none';
  
  // Apply the selected animation
  switch (animationType) {
    case "fade-in":
      tl.from(elements, { 
        opacity: 0, 
        y: offsetY,
        x: offsetX,
        filter: blurFilter,
        duration: speed, 
        stagger: stagger, 
        ease: ease
      });
      break;
      
    case "stagger":
      tl.from(elements, { 
        opacity: 0, 
        y: offsetY,
        duration: speed, 
        stagger: stagger, 
        ease: ease
      });
      break;
      
    case "stagger-mix":
      tl.from(elements, { 
        opacity: 0, 
        scale: 0.5,
        y: offsetY,
        rotation: rotation,
        duration: speed, 
        stagger: stagger, 
        ease: ease
      });
      break;
      
    case "slide-up":
      tl.from(elements, { 
        y: offsetY || 50, 
        opacity: 0,
        duration: speed, 
        stagger: stagger, 
        ease: ease
      });
      break;
      
    case "scale-up":
      tl.from(elements, { 
        scale: 0.2, 
        opacity: 0,
        y: offsetY,
        duration: speed, 
        stagger: stagger, 
        ease: ease
      });
      break;
      
    case "rotate":
      tl.from(elements, { 
        rotation: rotation || 90, 
        opacity: 0,
        scale: 0.5,
        duration: speed, 
        stagger: stagger, 
        ease: ease
      });
      break;
      
    case "glitch":
      // Set initial state
      gsap.set(elements, { opacity: 0 });
      
      // First appear with glitch
      tl.to(elements, {
        opacity: 1,
        duration: speed * 0.3,
        stagger: stagger
      });
      
      // Add glitch effect
      for (let i = 0; i < 3; i++) {
        tl.to(elements, {
          x: () => gsap.utils.random(-10, 10),
          y: () => gsap.utils.random(-10, 10),
          skewX: () => gsap.utils.random(-20, 20),
          opacity: () => gsap.utils.random(0.3, 1),
          color: useMultiColor ? () => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return `rgb(${r},${g},${b})`;
          } : null,
          duration: 0.1,
          ease: "none"
        });
      }
      
      // Reset to normal
      tl.to(elements, {
        x: 0,
        y: 0,
        skewX: 0,
        opacity: 1,
        color: textColorInput ? textColorInput.value : '#ffffff',
        duration: 0.5,
        ease: "power3.out"
      });
      break;
      
    case "distortion":
      gsap.set(elements, { opacity: 0 });
      
      tl.to(elements, {
        opacity: 1,
        duration: speed * 0.5,
        stagger: stagger
      });
      
      tl.to(elements, {
        fontStretch: "200%",
        letterSpacing: "10px",
        duration: speed * 0.4,
        stagger: stagger,
        ease: "power2.inOut"
      });
      
      tl.to(elements, {
        fontStretch: "100%",
        letterSpacing: letterSpacingInput ? letterSpacingInput.value + "px" : "0px",
        duration: speed * 0.5,
        stagger: stagger,
        ease: "elastic.out(1,0.3)"
      });
      break;
      
    case "neon-pulse":
      // Set initial properties
      gsap.set(elements, {
        opacity: 0,
        textShadow: "0 0 0 rgba(0,0,0,0)"
      });
      
      // Fade in with glow
      tl.to(elements, {
        opacity: 1,
        duration: speed * 0.3,
        stagger: stagger
      });
      
      // Add pulsing glow
      tl.to(elements, {
        textShadow: `0 0 ${textShadowInput ? textShadowInput.value * 2 : 10}px ${textColorInput ? textColorInput.value : '#ffffff'}`,
        color: useMultiColor ? (i) => colors[i % colors.length] : (textColorInput ? textColorInput.value : '#ffffff'),
        ease: "sine.inOut",
        duration: speed * 0.5,
        repeat: 2,
        yoyo: true,
        stagger: stagger
      });
      
      // Settle to normal
      tl.to(elements, {
        textShadow: `0 0 ${textShadowInput ? textShadowInput.value : 0}px rgba(255,255,255,0.7)`,
        duration: speed * 0.3
      });
      break;
      
    case "wave-reveal":
      // Create wave effect through staggered y movement
      tl.from(elements, {
        y: offsetY || 20,
        opacity: 0,
        duration: speed,
        stagger: {
          each: delaySlider ? parseFloat(delaySlider.value) : 0.05,
          from: "center",
          grid: "auto",
          ease: "sine.inOut"
        },
        ease: "sine.out"
      });
      break;
      
    case "blur-in":
      tl.from(elements, {
        opacity: 0,
        filter: "blur(20px)",
        duration: speed,
        stagger: stagger,
        ease: ease
      });
      break;
      
    case "bounce":
      tl.from(elements, {
        opacity: 0,
        y: offsetY || 100,
        duration: speed,
        stagger: stagger,
        ease: "bounce.out"
      });
      break;
      
    case "split-merge":
      // Initial state
      gsap.set(elements, {
        opacity: 0,
        x: (i, el) => {
          const position = el.getBoundingClientRect();
          return position.left < window.innerWidth / 2 ? -50 : 50;
        }
      });
      
      // Merge to center
      tl.to(elements, {
        opacity: 1,
        x: 0,
        duration: speed,
        stagger: stagger,
        ease: "back.out(1.7)"
      });
      break;
      
    case "typewriter":
      // Set initial state
      gsap.set(elements, { opacity: 0 });
      
      // Type one character at a time
      tl.to(elements, {
        opacity: 1,
        duration: 0.1,
        stagger: {
          each: 0.1,
          from: "start",
          ease: "none"
        },
        ease: "none"
      });
      
      // Add cursor blink effect
      if (previewText) {
        const cursor = document.createElement("span");
        cursor.textContent = "|";
        cursor.style.position = "relative";
        cursor.style.marginLeft = "4px";
        cursor.style.fontWeight = "normal";
        
        previewText.appendChild(cursor);
        
        tl.to(cursor, {
          opacity: 0,
          repeat: 5,
          yoyo: true,
          duration: 0.3,
          ease: "power1.inOut"
        }, "-=0.5");
        
        tl.call(() => {
          if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
          }
        });
      }
      break;
      
    case "elastic":
      tl.from(elements, {
        opacity: 0,
        scale: 0,
        y: offsetY,
        x: offsetX,
        rotation: rotation,
        duration: speed,
        stagger: stagger,
        ease: "elastic.out(1,0.3)"
      });
      break;
      
    case "circular-reveal":
      // Create a circular reveal mask
      const maskTl = createTextMask("circle");
      if (maskTl) {
        tl.add(maskTl, 0);
      }
      
      // Animate the text itself
      tl.from(elements, {
        opacity: 0,
        scale: 0.9,
        duration: speed * 0.8,
        stagger: stagger,
        ease: ease
      }, 0.1);
      break;
      
    case "wipe-left-right":
      // Create a wipe mask
      const wipeTl = createTextMask("wipe-right");
      if (wipeTl) {
        tl.add(wipeTl, 0);
      }
      
      // Animate the text itself
      tl.from(elements, {
        opacity: 0,
        x: -20,
        duration: speed * 0.7,
        stagger: stagger,
        ease: ease
      }, 0.1);
      break;
      
    case "letter-shuffle":
      // Store original characters
      const originalChars = elements.map(el => el.textContent);
      
      // Random letters to shuffle through
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
      
      // Randomly change letters then restore them
      tl.to(elements, {
        opacity: 1,
        duration: 0.1,
        stagger: stagger
      });
      
      // Shuffle multiple times
      for (let i = 0; i < 5; i++) {
        tl.to(elements, {
          textContent: () => letters.charAt(Math.floor(Math.random() * letters.length)),
          duration: 0.05,
          stagger: stagger
        });
      }
      
      // Restore original text
      tl.to(elements, {
        textContent: (i) => originalChars[i],
        duration: 0.1,
        stagger: stagger
      });
      break;
      
    case "character-rotation":
      // Set initial state
      gsap.set(elements, {
        opacity: 0,
        rotationY: -90,
        transformPerspective: 800
      });
      
      // Rotate into view
      tl.to(elements, {
        opacity: 1,
        rotationY: 0,
        duration: speed,
        stagger: stagger,
        ease: "back.out(1.7)"
      });
      break;
      
    default:
      tl.from(elements, { 
        opacity: 0, 
        duration: speed, 
        stagger: stagger, 
        ease: ease
      });
      break;
  }
  
  // Add 3D effect if enabled
  if (use3d && !["typewriter", "circular-reveal", "wipe-left-right"].includes(animationType)) {
    tl.from(elements, { 
      z: -100, 
      rotationY: 45, 
      rotationX: -15,
      transformPerspective: 800, 
      duration: speed, 
      stagger: stagger, 
      ease: ease
    }, "<");
  }
  
  // Add multi-color effect if enabled
  if (useMultiColor && !["neon-pulse", "glitch", "letter-shuffle"].includes(animationType)) {
    tl.to(elements, {
      color: (i) => colors[i % colors.length],
      textShadow: "0 0 5px currentColor",
      duration: speed * 0.8,
      stagger: stagger,
      ease: "none"
    }, "<+=0.1");
  }
  
  // Add particles effect if enabled
  if (particlesEffectInput && particlesEffectInput.checked) {
    const particlesTl = createParticlesEffect(elements);
    if (particlesTl) {
      tl.add(particlesTl, speed * 1.5);
    }
  }
  
  return tl;
}

// Generate code string for selected format
function generateCodeString() {
  if (!animationSelect || !speedSlider || !easeSelect) return '';
  
  const animationType = animationSelect.value;
  const speed = parseFloat(speedSlider.value);
  const ease = easeSelect.value;
  const offsetY = offsetYInput ? parseInt(offsetYInput.value) : 30;
  const offsetX = offsetXInput ? parseInt(offsetXInput.value) : 0;
  const rotation = rotationInput ? parseInt(rotationInput.value) : 0;
  const blurEffect = blurEffectInput ? parseInt(blurEffectInput.value) : 0;
  const scaleEffect = scaleEffectInput ? parseFloat(scaleEffectInput.value) : 1.0;
  const use3d = use3dInput && use3dInput.checked;
  const useMultiColor = useMultiColorInput && useMultiColorInput.checked;
  const useMask = useMaskInput && useMaskInput.checked;
  const maskType = useMask && maskTypeSelect ? maskTypeSelect.value : null;
  const staggerOrder = staggerOrderSelect ? staggerOrderSelect.value : "default";
  const staggerDelay = delaySlider ? parseFloat(delaySlider.value) : 0.05;
  const iterations = iterationsInput ? parseInt(iterationsInput.value) : 0;
  const useParticles = particlesEffectInput && particlesEffectInput.checked;

  // JavaScript code string
  return `// Animation: ${animationType}
// Split text into ${currentSplitType}
const element = document.querySelector('.your-element-selector');
const splitText = new SplitType(element, { types: '${currentSplitType}' });
const elements = splitText.${currentSplitType};

// Create timeline
const tl = gsap.timeline({
  repeat: ${iterations},
  repeatDelay: 0.5
});

${useMask ? `// Create mask for text reveal
const dimensions = element.getBoundingClientRect();
const maskDiv = document.createElement('div');
maskDiv.style.position = 'absolute';
maskDiv.style.top = '0';
maskDiv.style.left = '0';
maskDiv.style.width = \`\${dimensions.width}px\`;
maskDiv.style.height = \`\${dimensions.height}px\`;
maskDiv.style.overflow = 'hidden';

// Apply mask
element.parentNode.appendChild(maskDiv);
maskDiv.appendChild(element);

// Animate mask
tl.from(maskDiv, {
  ${maskType === 'circle' ? 
    `width: 0,
  height: 0,
  borderRadius: '50%',
  left: '50%',
  top: '50%',
  transformOrigin: 'center'` : 
    `width: 0,
  height: '100%'`
  },
  duration: ${speed},
  ease: "${ease}"
});
` : ''}

// Main animation
tl.from(elements, { 
  opacity: 0, 
  y: ${offsetY},
${offsetX !== 0 ? `  x: ${offsetX},\n` : ''}
${rotation !== 0 ? `  rotation: ${rotation},\n` : ''}
${blurEffect > 0 ? `  filter: "blur(${blurEffect}px)",\n` : ''}
${scaleEffect !== 1 ? `  scale: ${scaleEffect},\n` : ''}
  duration: ${speed}, 
  stagger: {
    each: ${staggerDelay},
${staggerOrder !== 'default' ? `    from: "${staggerOrder}",\n` : ''}
    ease: "${ease}"
  }, 
  ease: "${ease}"
}${useMask ? ', 0' : ''});

${use3d ? `// Add 3D effect
tl.from(elements, { 
  z: -100, 
  rotationY: 45,
  rotationX: -15,
  transformPerspective: 800, 
  duration: ${speed}, 
  stagger: {
    each: ${staggerDelay},
    from: "${staggerOrder}"
  }, 
  ease: "${ease}"
}, "<");
` : ''}

${useMultiColor ? `// Add multi-color effect
const colors = [];
for (let i = 0; i < elements.length; i++) {
  const hue = Math.floor(Math.random() * 360);
  colors.push(\`hsl(\${hue}, 80%, 60%)\`);
}

tl.to(elements, {
  color: (i) => colors[i % colors.length],
  textShadow: "0 0 5px currentColor",
  duration: ${speed * 0.8},
  stagger: {
    each: ${staggerDelay},
    from: "${staggerOrder}"
  },
  ease: "none"
}, "<+=0.1");
` : ''}

${useParticles ? `// Add particles effect
const particlesTl = gsap.timeline();

particlesTl.to(elements, {
  x: () => gsap.utils.random(-100, 100),
  y: () => gsap.utils.random(-100, 100),
  opacity: 0.3,
  scale: () => gsap.utils.random(0.5, 1.5),
  rotation: () => gsap.utils.random(-90, 90),
  duration: 0.8,
  ease: "power2.out",
  stagger: {
    each: 0.02,
    from: "random"
  }
});

particlesTl.to(elements, {
  x: 0,
  y: 0,
  opacity: 1,
  scale: 1,
  rotation: 0,
  duration: 1.2,
  ease: "elastic.out(1, 0.3)",
  stagger: {
    each: 0.03,
    from: "${staggerOrder}"
  }
});

tl.add(particlesTl, ${speed * 1.5});
` : ''}`;
}

// Update code output
function updateCodeOutput() {
  if (!codeOutput) return;
  const codeString = generateCodeString();
  codeOutput.innerHTML = highlightSyntax(codeString);
}

// Display copy confirmation
function showCodeCopied() {
  if (!codeCopyMsg) return;
  codeCopyMsg.classList.add("show");
  setTimeout(() => { codeCopyMsg.classList.remove("show"); }, 2000);
}

// Display toast notification
function showToast(message = "Code copied to clipboard!") {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

// Update animation and timeline controls
function updateAnimation() {
  // If not on the animator tab, don't proceed
  if (!document.getElementById('animator-tab').classList.contains('active')) return;
  if (!previewText) return;
  
  // Kill any active timeline
  if (activeTimeline) { 
    activeTimeline.kill(); 
    activeTimeline = null; 
  }
  
  // Reset text container
  gsap.set(previewText, { clearProps: "all" });
  if (splitPreview) { splitPreview.revert(); }
  
  // Clear any existing SVG masks
  if (preview) {
    const existingMasks = preview.querySelectorAll("svg");
    existingMasks.forEach(mask => mask.remove());
  }
  
  // Update text styling
  updateTextStyle();
  
  // Apply split text again
  splitPreview = new SplitType(previewText, { types: currentSplitType });
  
  // Create new timeline if split was successful
  if (splitPreview && splitPreview[currentSplitType]) {
    activeTimeline = createAnimationTimeline(splitPreview[currentSplitType]);
    
    // Initialize timeline slider
    if (timelineSlider) timelineSlider.value = 0;
  }
  
  // Update code output
  updateCodeOutput();
}

// Timeline slider control
if (timelineSlider) {
  timelineSlider.addEventListener("input", () => {
    if (activeTimeline) {
      const progress = timelineSlider.value / 100;
      activeTimeline.progress(progress);
    }
  });
}

// Timeline controls
if (timelinePlay) {
  timelinePlay.addEventListener("click", () => {
    if (activeTimeline) {
      activeTimeline.play();
    }
  });
}

if (timelinePause) {
  timelinePause.addEventListener("click", () => {
    if (activeTimeline) {
      activeTimeline.pause();
    }
  });
}

if (timelineReset) {
  timelineReset.addEventListener("click", () => {
    if (activeTimeline) {
      activeTimeline.progress(0).pause();
      if (timelineSlider) timelineSlider.value = 0;
    }
  });
}

// Play button handler
if (playBtn) {
  playBtn.addEventListener("click", () => {
    if (activeTimeline) {
      activeTimeline.progress(0).play();
    }
  });
}

// Generate random settings
function generateRandomSettings() {
  if (!animationSelect || !staggerOrderSelect || !speedSlider || !delaySlider) return;
  
  // Animation settings
  const animations = Array.from(animationSelect.options).map(opt => opt.value);
  animationSelect.value = animations[Math.floor(Math.random() * animations.length)];
  
  const splitTypes = ['chars', 'words', 'lines'];
  currentSplitType = splitTypes[Math.floor(Math.random() * splitTypes.length)];
  
  const staggerOrders = Array.from(staggerOrderSelect.options).map(opt => opt.value);
  staggerOrderSelect.value = staggerOrders[Math.floor(Math.random() * staggerOrders.length)];
  
  // Timing settings
  speedSlider.value = (Math.random() * 2 + 0.5).toFixed(1);
  delaySlider.value = (Math.random() * 0.2 + 0.02).toFixed(2);
  
  // Text styling
  if (fontSizeInput) fontSizeInput.value = Math.floor(Math.random() * 50 + 30);
  if (letterSpacingInput) letterSpacingInput.value = Math.floor(Math.random() * 10);
  
  // Random color - Using GSAP green colors
  if (textColorInput && colorTextValue) {
    const greenShades = ["#88ce02", "#75b302", "#4e9815", "#65C15F", "#00FF7F"];
    const randomColor = greenShades[Math.floor(Math.random() * greenShades.length)];
    textColorInput.value = randomColor;
    colorTextValue.value = randomColor;
  }
  
  // Advanced settings
  if (offsetYInput) offsetYInput.value = Math.floor(Math.random() * 100 - 50);
  if (offsetXInput) offsetXInput.value = Math.floor(Math.random() * 100 - 50);
  if (rotationInput) rotationInput.value = Math.floor(Math.random() * 360 - 180);
  if (blurEffectInput) blurEffectInput.value = Math.floor(Math.random() * 10);
  if (scaleEffectInput) scaleEffectInput.value = (Math.random() * 1.5 + 0.5).toFixed(1);
  
  // Random easing
  if (easeSelect) {
    const easings = Array.from(easeSelect.options).map(opt => opt.value);
    easeSelect.value = easings[Math.floor(Math.random() * easings.length)];
  }
  
  // Toggle options
  if (use3dInput) use3dInput.checked = Math.random() > 0.5;
  if (useMultiColorInput) useMultiColorInput.checked = Math.random() > 0.5;
  if (useMaskInput) useMaskInput.checked = Math.random() > 0.7; // Less frequent
  if (particlesEffectInput) particlesEffectInput.checked = Math.random() > 0.7; // Less frequent
  
  // Mask settings if enabled
  if (useMaskInput && useMaskInput.checked && maskControls && maskTypeSelect) {
    maskControls.style.display = "block";
    const maskTypes = Array.from(maskTypeSelect.options).map(opt => opt.value);
    maskTypeSelect.value = maskTypes[Math.floor(Math.random() * maskTypes.length)];
    if (customMaskControls) 
      customMaskControls.style.display = maskTypeSelect.value === "custom" ? "block" : "none";
  } else if (maskControls) {
    maskControls.style.display = "none";
  }
  
  if (iterationsInput) iterationsInput.value = Math.floor(Math.random() * 4);
  
  // Update UI values and animation
  updateValueDisplays();
  handleSplitTypeChange();
  updateEaseVisualization();
  
  if (previewText) {
    previewText.classList.add('bounce-in');
    setTimeout(() => { previewText.classList.remove('bounce-in'); }, 500);
  }
  
  showToast("Random settings applied! ✨");
}

// Reset all controls to default
function resetControls() {
  if (animationSelect) animationSelect.value = "fade-in";
  currentSplitType = 'chars';
  if (staggerOrderSelect) staggerOrderSelect.value = "default";
  if (speedSlider) speedSlider.value = 1;
  if (delaySlider) delaySlider.value = 0.05;
  if (easeSelect) easeSelect.value = "power2.out";
  
  if (fontSizeInput) fontSizeInput.value = 48;
  if (fontSelect) fontSelect.value = "'Poppins', sans-serif";
  if (textColorInput) textColorInput.value = "#ffffff";
  if (colorTextValue) colorTextValue.value = "#ffffff";
  if (letterSpacingInput) letterSpacingInput.value = 0;
  if (textWeightSelect) textWeightSelect.value = "700";
  if (textTransformSelect) textTransformSelect.value = "uppercase";
  if (textShadowInput) textShadowInput.value = 0;
  
  isBold = true;
  isItalic = false;
  isUnderlined = false;
  if (boldBtn) boldBtn.classList.toggle("active", isBold);
  if (italicBtn) italicBtn.classList.toggle("active", isItalic);
  if (underlineBtn) underlineBtn.classList.toggle("active", isUnderlined);
  
  if (offsetYInput) offsetYInput.value = 30;
  if (offsetXInput) offsetXInput.value = 0;
  if (rotationInput) rotationInput.value = 0;
  if (blurEffectInput) blurEffectInput.value = 3;
  if (scaleEffectInput) scaleEffectInput.value = 1.0;
  if (use3dInput) use3dInput.checked = false;
  if (useMultiColorInput) useMultiColorInput.checked = false;
  if (iterationsInput) iterationsInput.value = 0;
  if (useMaskInput) useMaskInput.checked = false;
  if (maskControls) maskControls.style.display = "none";
  if (particlesEffectInput) particlesEffectInput.checked = false;
  
  if (customTextInput) customTextInput.value = "Welcome to the Future";
  
  updateValueDisplays();
  handleSplitTypeChange();
  updateEaseVisualization();
  showToast("Settings reset to default! ✨");
}

// Export JS code
if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    if (!codeOutput) return;
    
    const code = codeOutput.innerText;
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    a.href = url;
    a.download = `textfusion-animation-${Date.now()}.js`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    
    showToast("Animation code exported! 📦");
  });
}

// Event listeners for controls
if (animationSelect) animationSelect.addEventListener("change", updateAnimation);
if (staggerOrderSelect) staggerOrderSelect.addEventListener("change", updateAnimation);
if (speedSlider) speedSlider.addEventListener("input", () => { updateValueDisplays(); updateAnimation(); });
if (delaySlider) delaySlider.addEventListener("input", () => { updateValueDisplays(); updateAnimation(); });
if (easeSelect) easeSelect.addEventListener("change", () => { updateEaseVisualization(); updateAnimation(); });
if (fontSizeInput) fontSizeInput.addEventListener("input", () => { updateValueDisplays(); updateTextStyle(); updateAnimation(); });
if (fontSelect) fontSelect.addEventListener("change", () => { updateTextStyle(); updateAnimation(); });
if (textColorInput) textColorInput.addEventListener("input", () => { updateValueDisplays(); updateTextStyle(); });
if (letterSpacingInput) letterSpacingInput.addEventListener("input", () => { updateValueDisplays(); updateTextStyle(); });
if (textWeightSelect) textWeightSelect.addEventListener("change", () => { updateTextStyle(); updateAnimation(); });
if (textTransformSelect) textTransformSelect.addEventListener("change", () => { updateTextStyle(); updateAnimation(); });
if (textShadowInput) textShadowInput.addEventListener("input", () => { updateValueDisplays(); updateTextStyle(); });
if (offsetYInput) offsetYInput.addEventListener("input", () => { updateValueDisplays(); updateAnimation(); });
if (offsetXInput) offsetXInput.addEventListener("input", () => { updateValueDisplays(); updateAnimation(); });
if (rotationInput) rotationInput.addEventListener("input", () => { updateValueDisplays(); updateAnimation(); });
if (blurEffectInput) blurEffectInput.addEventListener("input", () => { updateValueDisplays(); updateAnimation(); });
if (scaleEffectInput) scaleEffectInput.addEventListener("input", () => { updateValueDisplays(); updateAnimation(); });
if (use3dInput) use3dInput.addEventListener("change", updateAnimation);
if (useMultiColorInput) useMultiColorInput.addEventListener("change", updateAnimation);
if (iterationsInput) iterationsInput.addEventListener("input", () => { updateValueDisplays(); updateAnimation(); });

if (resetBtn) resetBtn.addEventListener("click", resetControls);
if (randomBtn) randomBtn.addEventListener("click", generateRandomSettings);
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    if (codeOutput) {
      navigator.clipboard.writeText(codeOutput.innerText).then(() => { 
        showToast("Code copied to clipboard! ✨"); 
      });
    }
  });
}
if (codeOutput) {
  codeOutput.addEventListener("click", () => {
    navigator.clipboard.writeText(codeOutput.innerText).then(() => { 
      showCodeCopied(); 
    });
  });
}

// Prevent default form submission on buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function(e) { 
    if (this.getAttribute('type') !== 'submit') { 
      e.preventDefault(); 
    } 
  });
});

// Initialize on DOMContentLoaded
function initialize() {
  updateValueDisplays();
  updateTextStyle();
  updateEaseVisualization();
  
  // Set initial handle positions if they exist
  if (easeHandle1 && easeHandle2) {
    easeHandle1.style.left = '40px';
    easeHandle1.style.top = '120px';
    easeHandle2.style.left = '160px';
    easeHandle2.style.top = '80px';
    
    // Initialize draggable functionality
    makeDraggable(easeHandle1);
    makeDraggable(easeHandle2);
  }
  
  // Hide mask options initially
  if (maskControls) {
    maskControls.style.display = "none";
  }
  
  setTimeout(() => { 
    updateAnimation();
    showToast("Welcome to TextFusion Pro! 🚀"); 
  }, 1000);
}

document.addEventListener("DOMContentLoaded", initialize);
