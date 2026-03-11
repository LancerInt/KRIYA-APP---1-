# Architecture Notes
- Feature-first UI modules under `src/features`.
- Infra layers: `database`, `repositories`, `services`, `store`, `navigation`, `shared`.
- Persistence isolated in repositories; services handle OCR/export/search/security/backup.
- Assumptions: OCR native binding and secure enclave hashing are placeholders in this scaffold.
- Placeholder note: PIN hashing uses pseudo hash pending `react-native-keychain`/native crypto integration.
