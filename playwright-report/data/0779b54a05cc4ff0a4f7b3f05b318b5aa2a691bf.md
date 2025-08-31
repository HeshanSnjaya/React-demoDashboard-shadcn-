# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - heading "DemoApp" [level=1] [ref=e6]
      - button "Toggle theme" [ref=e9] [cursor=pointer]:
        - img
        - generic [ref=e10] [cursor=pointer]: Toggle theme
  - main [ref=e11]:
    - generic [ref=e13]:
      - generic [ref=e14]:
        - heading "Sign in" [level=1] [ref=e15]
        - paragraph [ref=e16]: Use demo credentials below. Any valid input accepted.
      - generic [ref=e17]:
        - generic [ref=e18]:
          - generic [ref=e19]: Username
          - textbox "Username" [ref=e20]: testuser
        - generic [ref=e21]:
          - generic [ref=e22]: Password
          - textbox "Password" [active] [ref=e23]: password123
        - generic [ref=e24]:
          - generic [ref=e25]: Role
          - combobox [ref=e26] [cursor=pointer]:
            - generic: Viewer
            - img [ref=e27] [cursor=pointer]
          - combobox [ref=e29]
        - button "Continue" [ref=e30] [cursor=pointer]
      - generic [ref=e31]:
        - paragraph [ref=e32]: Quick roles
        - generic [ref=e33]:
          - button "Admin" [ref=e34] [cursor=pointer]
          - button "Broker" [ref=e35] [cursor=pointer]
          - button "Analyst" [ref=e36] [cursor=pointer]
          - button "Viewer" [ref=e37] [cursor=pointer]
      - paragraph [ref=e38]: By continuing, you agree to our Terms and acknowledge our Privacy Policy.
```