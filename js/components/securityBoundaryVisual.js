/**
 * LAKSHMAN REKHA AI - Interactive Security Boundary Visual
 * Signature 60fps Canvas Boundary Animation with AI Core,
 * Concentric Protective Rings, Orbital Particles, Threat Deflection & Mouse Reactivity.
 */

export class SecurityBoundaryVisual {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.animationFrameId = null;

    // Dimensions
    this.width = 480;
    this.height = 480;
    this.centerX = 240;
    this.centerY = 240;
    this.baseRadius = 140;

    // Signature Load State
    this.loadPhase = 0; // 0: point traveling, 1: ring complete & pulse, 2: active
    this.loadProgress = 0; // 0 to 1 for ring travel

    // Mouse Interaction
    this.mouse = { x: -1000, y: -1000, isHovering: false };

    // Core Orb Glow Phase
    this.time = 0;

    // Active Particles
    this.safeParticles = [];
    this.threatParticles = [];
    this.blockedBadges = []; // [{x, y, text, life, maxLife}]
    this.ripples = []; // [{radius, maxRadius, alpha, color}]

    this.initParticles();
    this.setupEvents();
    this.resize();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 480;
    this.height = rect.height || 480;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.baseRadius = Math.min(this.width, this.height) * 0.32;
  }

  initParticles() {
    // 8 Safe Nodes orbiting inside or on the boundary
    this.safeParticles = [];
    for (let i = 0; i < 8; i++) {
      this.safeParticles.push({
        angle: (i * Math.PI * 2) / 8,
        radius: this.baseRadius * (0.45 + Math.random() * 0.45),
        speed: (0.004 + Math.random() * 0.004) * (i % 2 === 0 ? 1 : -1),
        size: 3 + Math.random() * 2,
        color: '#06b6d4',
        glow: 'rgba(6, 182, 212, 0.7)'
      });
    }

    // Initial ambient threat particles slowly cruising outside
    this.spawnAmbientThreat('PROMPT INJECTION', Math.PI * 0.15, 1.35);
    this.spawnAmbientThreat('DATA LEAK', Math.PI * 0.85, 1.4);
    this.spawnAmbientThreat('SAMPLE', Math.PI * 1.45, 1.28);
    this.spawnAmbientThreat('TRUSTED AI', Math.PI * 1.85, 0.7, '#10b981');
  }

  spawnAmbientThreat(label, angle, distanceFactor, color = '#ef4444') {
    this.threatParticles.push({
      label: label,
      angle: angle,
      distance: this.baseRadius * distanceFactor,
      targetDistance: this.baseRadius * distanceFactor,
      speed: 0.002,
      color: color,
      size: 4,
      isAmbient: true
    });
  }

  setupEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.isHovering = true;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.isHovering = false;
    });

    this.canvas.addEventListener('click', () => {
      this.triggerThreat('PROMPT INJECTION');
    });

    window.addEventListener('resize', () => this.resize());
  }

  start() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    const animate = () => {
      this.render();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  triggerThreat(threatType = 'PROMPT INJECTION') {
    const angle = Math.random() * Math.PI * 2;
    const startDist = this.baseRadius * 1.6;

    const newThreat = {
      label: threatType.toUpperCase(),
      angle: angle,
      distance: startDist,
      speedDist: 2.2, // moves towards center
      color: '#ef4444',
      size: 5,
      isAttacking: true,
      blocked: false
    };

    this.threatParticles.push(newThreat);

    // Audio cue / haptic feedback if permitted
    try {
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(30);
      }
    } catch (_) {}
  }

  render() {
    this.time += 0.02;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Step 1: Signature Loading Phase Progress
    if (this.loadPhase === 0) {
      this.loadProgress += 0.015;
      if (this.loadProgress >= 1) {
        this.loadProgress = 1;
        this.loadPhase = 1;
        // Trigger protective ring activation ripple
        this.ripples.push({ radius: this.baseRadius, maxRadius: this.baseRadius * 1.3, alpha: 1, color: '#f59e0b' });
      }
    }

    // Step 2: Draw Background Coordinate Rings
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.baseRadius * 0.4, 0, Math.PI * 2);
    ctx.arc(this.centerX, this.centerY, this.baseRadius * 0.75, 0, Math.PI * 2);
    ctx.arc(this.centerX, this.centerY, this.baseRadius * 1.35, 0, Math.PI * 2);
    ctx.stroke();

    // Subtle crosshairs
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.beginPath();
    ctx.moveTo(this.centerX - this.baseRadius * 1.45, this.centerY);
    ctx.lineTo(this.centerX + this.baseRadius * 1.45, this.centerY);
    ctx.moveTo(this.centerX, this.centerY - this.baseRadius * 1.45);
    ctx.lineTo(this.centerX, this.centerY + this.baseRadius * 1.45);
    ctx.stroke();
    ctx.restore();

    // Step 3: Draw Ripples
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const rip = this.ripples[i];
      rip.radius += 1.8;
      rip.alpha -= 0.025;
      if (rip.alpha <= 0) {
        this.ripples.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, rip.radius, 0, Math.PI * 2);
      ctx.strokeStyle = rip.color;
      ctx.globalAlpha = Math.max(0, rip.alpha);
      ctx.lineWidth = 2;
      ctx.shadowColor = rip.color;
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.restore();
    }

    // Step 4: Draw The Lakshman Rekha Boundary (Golden Ring)
    const arcEnd = this.loadPhase === 0 ? this.loadProgress * Math.PI * 2 : Math.PI * 2;
    
    // Dynamic Mouse Displacement / Proximity Pull
    let ringRadius = this.baseRadius;
    if (this.mouse.isHovering) {
      const dx = this.mouse.x - this.centerX;
      const dy = this.mouse.y - this.centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (Math.abs(dist - this.baseRadius) < 50) {
        ringRadius += Math.sin(this.time * 4) * 3;
      }
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, ringRadius, -Math.PI / 2, -Math.PI / 2 + arcEnd);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 20;
    ctx.stroke();

    // Outer concentric accent ring (dashed)
    if (this.loadPhase >= 1) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, ringRadius + 14, 0, Math.PI * 2);
      ctx.setLineDash([4, 12]);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    }

    // The Traveling Light Point during initial activation
    if (this.loadPhase === 0) {
      const leadAngle = -Math.PI / 2 + arcEnd;
      const px = this.centerX + Math.cos(leadAngle) * ringRadius;
      const py = this.centerY + Math.sin(leadAngle) * ringRadius;

      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 25;
      ctx.fill();
    }
    ctx.restore();

    // Step 5: Draw Central AI Core (Glowing Orb)
    if (this.loadPhase >= 1) {
      ctx.save();
      const coreRadius = 36 + Math.sin(this.time * 2) * 2;

      // Deep cyan/blue radiant aura
      const radGrad = ctx.createRadialGradient(
        this.centerX, this.centerY, 4,
        this.centerX, this.centerY, coreRadius * 1.8
      );
      radGrad.addColorStop(0, '#ffffff');
      radGrad.addColorStop(0.2, '#38bdf8');
      radGrad.addColorStop(0.65, '#0284c7');
      radGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');

      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, coreRadius * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = radGrad;
      ctx.fill();

      // Inner Core Orb
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, coreRadius, 0, Math.PI * 2);
      const innerGrad = ctx.createLinearGradient(
        this.centerX - coreRadius, this.centerY - coreRadius,
        this.centerX + coreRadius, this.centerY + coreRadius
      );
      innerGrad.addColorStop(0, '#38bdf8');
      innerGrad.addColorStop(1, '#0369a1');
      ctx.fillStyle = innerGrad;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 24;
      ctx.fill();

      // Cybernetic Shield Glyph in center
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🛡️', this.centerX, this.centerY);

      ctx.restore();
    }

    // Step 6: Update & Draw Safe Orbiting Particles
    if (this.loadPhase >= 1) {
      ctx.save();
      for (let i = 0; i < this.safeParticles.length; i++) {
        const p = this.safeParticles[i];
        p.angle += p.speed;

        let px = this.centerX + Math.cos(p.angle) * p.radius;
        let py = this.centerY + Math.sin(p.angle) * p.radius;

        // Mouse repulsion
        if (this.mouse.isHovering) {
          const dx = px - this.mouse.x;
          const dy = py - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            px += (dx / dist) * (60 - dist) * 0.4;
            py += (dy / dist) * (60 - dist) * 0.4;
          }
        }

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < this.safeParticles.length; j++) {
          const p2 = this.safeParticles[j];
          const px2 = this.centerX + Math.cos(p2.angle) * p2.radius;
          const py2 = this.centerY + Math.sin(p2.angle) * p2.radius;
          const lineDist = Math.hypot(px - px2, py - py2);
          if (lineDist < 75) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px2, py2);
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.16)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    }

    // Step 7: Update & Draw Threat Particles Outside the Boundary
    ctx.save();
    for (let i = this.threatParticles.length - 1; i >= 0; i--) {
      const tp = this.threatParticles[i];

      if (tp.isAttacking) {
        tp.distance -= tp.speedDist;

        // Collision with the Lakshman Rekha Boundary!
        if (tp.distance <= ringRadius && !tp.blocked) {
          tp.blocked = true;
          const hitX = this.centerX + Math.cos(tp.angle) * ringRadius;
          const hitY = this.centerY + Math.sin(tp.angle) * ringRadius;

          // Boundary Contact Pulse
          this.ripples.push({ radius: ringRadius - 10, maxRadius: ringRadius + 30, alpha: 0.9, color: '#ef4444' });

          // Add [BLOCKED] Badge at collision point
          this.blockedBadges.push({
            x: hitX,
            y: hitY,
            text: `${tp.label} BLOCKED`,
            life: 60,
            maxLife: 60
          });

          // Deflection bounce outwards
          tp.speedDist = -2.5;
        }

        if (tp.blocked && tp.distance > this.baseRadius * 1.5) {
          this.threatParticles.splice(i, 1);
          continue;
        }
      } else {
        // Ambient orbit
        tp.angle += tp.speed;
      }

      const tx = this.centerX + Math.cos(tp.angle) * tp.distance;
      const ty = this.centerY + Math.sin(tp.angle) * tp.distance;

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(tx, ty, tp.size, 0, Math.PI * 2);
      ctx.fillStyle = tp.color;
      ctx.shadowColor = tp.color;
      ctx.shadowBlur = 12;
      ctx.fill();

      // Draw label
      ctx.font = '600 10px JetBrains Mono, monospace';
      ctx.fillStyle = tp.color === '#ef4444' ? 'rgba(239, 68, 68, 0.85)' : 'rgba(16, 185, 129, 0.85)';
      ctx.textAlign = tx > this.centerX ? 'left' : 'right';
      const labelOffset = tx > this.centerX ? 8 : -8;
      ctx.fillText(tp.label, tx + labelOffset, ty + 3);
    }
    ctx.restore();

    // Step 8: Draw Blocked Badges
    ctx.save();
    for (let i = this.blockedBadges.length - 1; i >= 0; i--) {
      const b = this.blockedBadges[i];
      b.life--;
      const alpha = b.life / b.maxLife;

      if (b.life <= 0) {
        this.blockedBadges.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
      ctx.strokeStyle = '#fca5a5';
      ctx.lineWidth = 1;

      const badgeWidth = 140;
      const badgeHeight = 22;
      const bx = b.x - badgeWidth / 2;
      const by = b.y - badgeHeight / 2 - (1 - alpha) * 20;

      // Rounded pill
      ctx.beginPath();
      ctx.roundRect(bx, by, badgeWidth, badgeHeight, 11);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`✕ ${b.text}`, b.x, by + badgeHeight / 2);
      ctx.restore();
    }
    ctx.restore();
  }
}
