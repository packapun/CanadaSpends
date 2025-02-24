import asyncio
import aiohttp
import sys
import os
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from rich.text import Text

console = Console()

# Get API URL from environment variable or use default for Docker service
API_URL = os.getenv('API_URL', 'http://api:8000')

def display_welcome():
    welcome_text = """
    🇨🇦 Welcome to Canada Spends Chat! 🇨🇦
    
    Ask questions about Canadian government spending data.
    Type 'q', 'quit', or 'exit' to end the chat.
    Type 'clear' to clear the screen.
    """
    console.print(Panel(welcome_text, title="Canada Spends Chat", border_style="blue"))

async def check_api_health():
    """Check if the API is running and ready."""
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(f"{API_URL}/health") as response:
                if response.status == 200:
                    data = await response.json()
                    return data
                return None
        except aiohttp.ClientError:
            return None

async def initialize_connection():
    """Check if API is ready."""
    with console.status("[bold blue]Connecting to API...", spinner="dots"):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{API_URL}/health") as response:
                    if response.status == 200:
                        data = await response.json()
                        if data.get("status") == "ready" and data.get("query_engine_ready"):
                            return True
                    console.print("\n[red]API is not ready[/red]")
                    return False
        except aiohttp.ClientError as e:
            console.print(f"\n[red]Could not connect to API: {str(e)}[/red]")
            return False

async def process_query(session: aiohttp.ClientSession, question: str):
    """Process a single query and display the response."""
    with console.status("[bold blue]Thinking...", spinner="dots"):
        try:
            async with session.get(f"{API_URL}/query", params={"question": question}) as response:
                data = await response.json()
                
                if response.status != 200:
                    error_msg = data.get("error", "Unknown error occurred")
                    console.print(f"\n[red]Error: {error_msg}[/red]")
                    return

                console.print("\n[bold green]Canada Spends Chat[/bold green]")
                console.print(Panel(data["answer"], border_style="green"))
        except Exception as e:
            console.print(f"\n[red]Error: {str(e)}[/red]")

def handle_command(command: str) -> bool:
    """Handle special commands. Returns True if should exit chat."""
    if command in ['q', 'quit', 'exit']:
        console.print("\n[yellow]Goodbye! Thanks for using Canada Spends Chat![/yellow]\n")
        return True
        
    if command == 'clear':
        console.clear()
        display_welcome()
        
    return False

async def chat_loop():
    """Main chat loop."""
    async with aiohttp.ClientSession() as session:
        while True:
            try:
                question = Prompt.ask("\n[bold blue]You[/bold blue]").strip()
                
                if not question:
                    continue
                    
                if handle_command(question.lower()):
                    break
                    
                await process_query(session, question)
                    
            except KeyboardInterrupt:
                console.print("\n[yellow]Goodbye! Thanks for using Canada Spends Chat![/yellow]\n")
                break

async def main():
    console.clear()
    display_welcome()
    
    # Check API connection
    if not await initialize_connection():
        console.print("\n[red]Error: Could not connect to the API service or the index is not ready.[/red]")
        console.print("[dim]This could be because:[/dim]")
        console.print("[dim]1. The API service is still initializing the index[/dim]")
        console.print("[dim]2. The API service failed to start[/dim]")
        console.print("[dim]3. There's a network connectivity issue[/dim]")
        console.print("\n[dim]You can check the API service logs with:[/dim]")
        console.print("[dim]docker compose logs api[/dim]\n")
        sys.exit(1)
    
    console.print("\n[green]✓ Connected to query engine![/green]\n")
    
    try:
        await chat_loop()
    except (KeyboardInterrupt, asyncio.CancelledError):
        console.print("\n[yellow]Goodbye! Thanks for using Canada Spends Chat![/yellow]\n")
    except Exception as e:
        console.print(f"\n[red]An error occurred: {str(e)}[/red]\n")
    finally:
        sys.exit(0)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        sys.exit(0) 