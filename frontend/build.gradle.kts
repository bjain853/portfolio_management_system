// Apply the plugin
plugins {
    id("io.github.pereduromega.node.plugin") version "2.0.4"
}

// When downloadNode is set to true you must provide a repository to download node
repositories {
    nodeRepository()

}

// The configuration block node is mandatory even if it is empty
node {
    // All possible configuration options with their default value are shown below
}

