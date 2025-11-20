# Contributing to MuleSoft to Spring Boot Migration

Thank you for your interest in contributing to this project! This document provides guidelines for contributing.

## 🤝 How to Contribute

### Reporting Issues

- Use the GitHub Issues tab to report bugs or request features
- Provide clear descriptions and reproduction steps
- Include system information (OS, Java version, etc.)

### Development Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/sirrohan1708/mul-to-springboot-migration.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code patterns
   - Add tests for new features
   - Update documentation as needed

4. **Test your changes**
   ```bash
   mvn clean test
   cd integration-visualizer && npm test
   ```

5. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   git commit -m "docs: update documentation"
   ```

6. **Push and create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Examples:**
```
feat: add circuit breaker pattern with Resilience4j
fix: resolve CORS issue for dashboard
docs: update API documentation with new endpoints
test: add unit tests for CustomerMapper
refactor: simplify retry logic in ExternalApiClient
```

## 💻 Code Style Guidelines

### Backend (Java/Spring Boot)

1. **MuleSoft Equivalency Comments**
   - Always include comments mapping to MuleSoft concepts
   ```java
   // Equivalent to MuleSoft Flow
   // MuleSoft HTTP Listener → @RestController
   // MuleSoft HTTP Connector → WebClient
   ```

2. **Emoji Logging Pattern**
   - Use structured emoji logging for flow semantics
   ```java
   log.info("🌊 Starting integration flow");
   log.info("🔌 Calling external API");
   log.info("🔄 Transforming data");
   log.info("📤 Publishing event");
   log.info("✅ Flow completed");
   ```

3. **Naming Conventions**
   - Use descriptive method names
   - Follow Spring Boot conventions
   - Use Lombok annotations where appropriate

4. **Error Handling**
   - Use `@Retryable` for transient failures
   - Map exceptions to proper HTTP status codes
   - Include meaningful error messages

### Frontend (Next.js/TypeScript)

1. **Component Structure**
   - Use TypeScript interfaces for props
   - Follow React hooks best practices
   - Use Tailwind CSS for styling

2. **File Organization**
   - Components in `src/components/`
   - API logic in `src/lib/`
   - Types in component files or shared types

3. **Code Quality**
   - Run ESLint before committing
   - Use TypeScript strict mode
   - Add proper type annotations

## 🧪 Testing Requirements

### Backend Tests
- Unit tests for all service methods
- Integration tests for controllers
- Test error scenarios and retry logic
- Maintain 80%+ coverage

### Frontend Tests
- Component unit tests
- API integration tests
- Mock external dependencies

## 📚 Documentation

- Update README.md for new features
- Add JavaDoc/JSDoc for public methods
- Include examples in documentation
- Update architecture diagrams if needed

## 🔍 Code Review Process

Pull requests will be reviewed for:

1. **Functionality** - Does it work as intended?
2. **Tests** - Are there adequate tests?
3. **Code Quality** - Is it maintainable and readable?
4. **Documentation** - Is it properly documented?
5. **Style** - Does it follow project conventions?

## 🚀 Release Process

1. Version bumps follow [Semantic Versioning](https://semver.org/)
2. Update CHANGELOG.md
3. Tag releases in Git
4. Update documentation

## 💡 Feature Suggestions

We welcome feature suggestions! Please:

1. Check existing issues first
2. Provide clear use case
3. Explain expected behavior
4. Consider implementation complexity

## ❓ Questions?

- Open a GitHub Issue for questions
- Check existing documentation in `docs/`
- Review code examples in the codebase

## 🙏 Recognition

Contributors will be recognized in:
- README.md acknowledgments
- Release notes
- Project documentation

Thank you for contributing to make this project better!
