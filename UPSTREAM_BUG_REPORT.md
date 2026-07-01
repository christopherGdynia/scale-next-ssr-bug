# Bug: TypeScript props missing on all React wrapper components (beta.160)

> **✅ RESOLVED in `3.0.0-beta.161`.** The generated `components.d.ts` now passes the third `Props` generic (`Components.*`) to `StencilReactComponent`, so all component-specific props resolve correctly. The `typescript.ignoreBuildErrors` workaround has been removed from this project. The report below is kept for historical context.

## Component

`@telekom/scale-components-react@3.0.0-beta.160`

## Description

Since `3.0.0-beta.160`, which switched to the new `@stencil/react-output-target` (v1.5.1) for component generation, **all component-specific props are missing from the TypeScript types**. Every Scale React component resolves to `Partial<{}>` instead of including the actual Stencil component props like `variant`, `label`, `size`, `opened`, etc.

The components work correctly at runtime — only the type definitions are broken.

## Root Cause

The generated `components.d.ts` declares components with only 2 type parameters:

```ts
// ❌ Current (broken) — components.d.ts
export declare const ScaleAlert: StencilReactComponent<
  ScaleAlertElement,
  ScaleAlertEvents
>;
export declare const ScaleButton: StencilReactComponent<
  ScaleButtonElement,
  ScaleButtonEvents
>;
```

But `StencilReactComponent` from `@stencil/react-output-target/runtime` expects **3** type parameters:

```ts
// From @stencil/react-output-target/dist/runtime/create-component.d.ts
export type StencilReactComponent<
  Element extends HTMLElement,
  Events extends EventNames = {},
  Props = {}, // ← this third parameter carries the actual component props
> = React.FunctionComponent<StencilProps<Element, Events, Props>>;
```

Since the third `Props` generic defaults to `{}`, all component-specific props (`variant`, `label`, `size`, `opened`, `percentage`, `checked`, etc.) are lost. The type resolves to:

```ts
Omit<React.HTMLAttributes<ScaleAlertElement>, never> &
  Partial<{}> &
  React.RefAttributes<ScaleAlertElement>;
// Only standard HTML attributes — no Scale-specific props
```

## Expected

The generated `components.d.ts` should include the third type parameter, mapping Stencil `@Prop()` declarations to TypeScript props:

```ts
// ✅ Expected (fixed)
export type ScaleAlertProps = {
  variant?: string;
  opened?: boolean;
  timeout?: boolean | number;
  headline?: string;
  icon?: string;
  size?: string;
  styles?: string;
};

export declare const ScaleAlert: StencilReactComponent<
  ScaleAlertElement,
  ScaleAlertEvents,
  ScaleAlertProps
>;
```

## Reproduction

### Minimal repro

```tsx
// test.tsx
import { ScaleAlert, ScaleButton } from "@telekom/scale-components-react";

// ❌ TypeScript error: Property 'variant' does not exist
<ScaleAlert variant="informational" opened>Hello</ScaleAlert>

// ❌ TypeScript error: Property 'variant' does not exist
<ScaleButton variant="secondary">Click me</ScaleButton>
```

### Steps

1. Create a new project with React 18/19 and TypeScript
2. `npm install @telekom/scale-components@3.0.0-beta.160 @telekom/scale-components-react@3.0.0-beta.160`
3. Import any Scale component and pass a component-specific prop
4. Run `npx tsc --noEmit`
5. Every component-specific prop produces `Property 'X' does not exist on type ...`

### Affected components

**All** components exported from `@telekom/scale-components-react` are affected — this is a systematic issue in the Stencil React Output Target code generator, not a single-component problem.

## Suggested Test

Add a type-level test to the build pipeline to catch regressions. This can be a `.ts` file that is type-checked but never executed:

```ts
// packages/components-react/__tests__/types.test.ts
// This file is only type-checked, not executed.
// It verifies that generated React wrappers expose Stencil @Prop() as React props.

import {
  ScaleAlert,
  ScaleButton,
  ScaleTag,
  ScaleTextField,
  ScaleSwitch,
  ScaleCheckbox,
  ScaleSlider,
  ScaleProgressBar,
  ScaleCollapsible,
  ScaleDropdownSelect,
  ScaleDropdownSelectItem,
  ScaleRadioButton,
  ScaleRadioButtonGroup,
  ScaleDatePicker,
  ScaleTextarea,
  ScaleRatingStars,
  ScaleTelekomHeader,
  ScaleTelekomNavItem,
} from "@telekom/scale-components-react";
import React from "react";

// Helper: assert that a JSX expression is valid (compile-time only)
function expectValidJSX(_jsx: React.ReactElement): void {}

// --- ScaleAlert ---
expectValidJSX(<ScaleAlert variant="informational" opened headline="Test" />);
expectValidJSX(<ScaleAlert variant="error" />);

// --- ScaleButton ---
expectValidJSX(<ScaleButton variant="secondary" size="small" disabled />);
expectValidJSX(<ScaleButton type="submit">Submit</ScaleButton>);

// --- ScaleTag ---
expectValidJSX(<ScaleTag size="small" color="green">Active</ScaleTag>);

// --- ScaleTextField ---
expectValidJSX(<ScaleTextField label="Name" value="John" required />);
expectValidJSX(<ScaleTextField label="Email" type="email" />);

// --- ScaleSwitch ---
expectValidJSX(<ScaleSwitch label="Dark Mode" checked />);

// --- ScaleCheckbox ---
expectValidJSX(<ScaleCheckbox label="Accept terms" checked />);

// --- ScaleSlider ---
expectValidJSX(<ScaleSlider label="Volume" min={0} max={100} value={50} showValue />);

// --- ScaleProgressBar ---
expectValidJSX(<ScaleProgressBar percentage={75} showStatus />);

// --- ScaleCollapsible ---
expectValidJSX(<ScaleCollapsible heading="Details"><div>Content</div></ScaleCollapsible>);

// --- ScaleDropdownSelect + Item ---
expectValidJSX(
  <ScaleDropdownSelect label="Choose">
    <ScaleDropdownSelectItem value="a" selected>Option A</ScaleDropdownSelectItem>
    <ScaleDropdownSelectItem value="b">Option B</ScaleDropdownSelectItem>
  </ScaleDropdownSelect>
);

// --- ScaleRadioButtonGroup + ScaleRadioButton ---
expectValidJSX(
  <ScaleRadioButtonGroup label="Choice">
    <ScaleRadioButton label="Option 1" value="1" checked />
    <ScaleRadioButton label="Option 2" value="2" />
  </ScaleRadioButtonGroup>
);

// --- ScaleDatePicker ---
expectValidJSX(<ScaleDatePicker label="Start date" />);

// --- ScaleTextarea ---
expectValidJSX(<ScaleTextarea label="Message" rows={5} required />);

// --- ScaleRatingStars ---
expectValidJSX(<ScaleRatingStars starSize="large" rating={4} />);

// --- ScaleTelekomHeader ---
expectValidJSX(
  <ScaleTelekomHeader appName="My App" appNameLink="/">
    <div>Nav</div>
  </ScaleTelekomHeader>
);

// --- ScaleTelekomNavItem ---
expectValidJSX(<ScaleTelekomNavItem active><a href="/">Home</a></ScaleTelekomNavItem>);

// --- Negative test: unknown props should NOT compile ---
// @ts-expect-error — nonExistentProp is not a valid prop
expectValidJSX(<ScaleAlert nonExistentProp="x" />);

// @ts-expect-error — nonExistentProp is not a valid prop
expectValidJSX(<ScaleButton nonExistentProp={42} />);
```

### How to integrate

Add this as a `tsc --noEmit` check in CI:

```json
{
  "scripts": {
    "test:types": "tsc --noEmit --project tsconfig.test.json"
  }
}
```

Where `tsconfig.test.json` includes the test file:

```json
{
  "extends": "./tsconfig.json",
  "include": ["__tests__/types.test.ts", "dist/**/*.d.ts"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "noEmit": true
  }
}
```

## Environment

- `@telekom/scale-components-react`: `3.0.0-beta.160`
- `@telekom/scale-components`: `3.0.0-beta.160`
- `@stencil/react-output-target`: `1.5.1` (transitive dep)
- React: 19.2.4
- TypeScript: 5.x
- Verified with Next.js 16.2.4 (Turbopack)

## Note

This might actually be a bug in **`@stencil/react-output-target`** itself (the code generator), not in the Scale repo directly. The Stencil Output Target generates `components.d.ts` without the third `Props` generic. If the fix needs to happen in Stencil's output target, please consider coordinating with the Stencil team or opening a linked issue at https://github.com/stencil-community/stencil-ds-output-targets.
