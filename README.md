# Chatbot Flow Builder

This project is a simple, extensible Chatbot Flow Builder built with Next.js, React Flow, and Tailwind CSS. It allows users to design conversational flows by connecting various message nodes.

## Features

*   **Text Node**: Create and manage "Send Message" nodes with editable text content.
*   **Nodes Panel**: A dedicated panel for dragging and dropping new "Message" nodes onto the canvas.
*   **Edge Connections**:
    *   **Source Handle**: Each node has a source handle (right side) that allows only one outgoing connection.
    *   **Target Handle**: Each node has a target handle (left side) that can accept multiple incoming connections.
*   **Settings Panel**: When a node is selected, this panel replaces the Nodes Panel, allowing you to:
    *   Edit the text content of the selected "Message" node.
    *   Delete the selected node (with a custom confirmation dialog).
*   **Save Flow**: A "Save Changes" button that validates the flow. It will display an error if there are more than one nodes and more than one node has an empty target handle (i.e., multiple un-connected starting points). On successful save, a custom pop-up dialog confirms the action.
*   **Custom UI**: Utilizes `shadcn/ui` components for a modern and consistent look, including custom toasts and dialogs instead of browser-native alerts.

## Demo

Watch a quick demonstration of the flow builder in action:

[Demo Video on Google Drive](https://drive.google.com/file/d/1jr4AsvG5OXyrnQOfMafwKh-Ovt8w63ld/view?usp=sharing)

## Installation and Setup

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**
    \`\`\`bash
    git clone <https://github.com/riyashivolkar/Chatbot-Flow-Builder>
    cd chatbot-flow-builder
    \`\`\`
    *(Replace `<https://github.com/riyashivolkar/Chatbot-Flow-Builder>` with your actual GitHub repository URL once you push the code.)*

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or yarn install
    # or pnpm install
    \`\`\`

3.  **Run the development server:**
    \`\`\`bash
    npm run dev
    # or yarn dev
    # or pnpm dev
    \`\`\`

4.  Open your browser and navigate to `http://localhost:3000`.

## Usage

*   **Add a Node**: Drag the "Message" button from the left panel onto the canvas.
*   **Move a Node**: Click and drag any node on the canvas.
*   **Edit Node Text**: Click on a node to select it. The right panel will change to the "Settings Panel" where you can edit the node's text.
*   **Connect Nodes**: Drag from the green circle (source handle) on the right of a node to the green circle (target handle) on the left of another node.
*   **Delete a Node**: Select a node, then click the "Delete Node" button in the "Settings Panel" and confirm.
*   **Save Flow**: Click the "Save Changes" button at the top right. The flow will be validated, and a success/error message will appear.

## Deployment

This project can be easily deployed to platforms like Vercel.

*   **Vercel**:
    1.  Push your code to a GitHub repository.
    2.  Import your repository into Vercel.
    3.  Vercel will automatically detect it as a Next.js project and deploy it.

*(Add your live deployment URL here once deployed, e.g., `https://chatbot-flow-builder-seven-mu.vercel.app/`)*

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.
