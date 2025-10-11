# Contributing to FHEVM SDK

Thank you for your interest in contributing to the FHEVM SDK! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/fhevm-sdk.git
   cd fhevm-sdk
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the SDK**
   ```bash
   npm run build:sdk
   ```

## Development Workflow

### Making Changes

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the appropriate directory:
   - SDK core: `packages/fhevm-sdk/src/`
   - Examples: `examples/`
   - Documentation: `README.md` files

3. Test your changes:
   ```bash
   # Test SDK build
   cd packages/fhevm-sdk
   npm run build

   # Test examples
   cd ../../examples/nextjs-app
   npm run dev
   ```

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Add JSDoc comments for public APIs
- Include type definitions

### Commit Messages

Use clear, descriptive commit messages:

```
feat: Add decryption hook for React
fix: Resolve initialization race condition
docs: Update installation instructions
test: Add encryption utility tests
```

### Pull Request Process

1. Update documentation for any changed functionality
2. Ensure all examples still work
3. Add tests if applicable
4. Create a pull request with a clear description

## Project Structure

```
packages/fhevm-sdk/     # SDK source code
examples/               # Example applications
docs/                   # Additional documentation
```

## Testing

Before submitting:

1. Build the SDK successfully
2. Run at least one example application
3. Verify documentation is accurate

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
